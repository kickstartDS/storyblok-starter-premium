/**
 * generatePresets.js
 *
 * Pure offline preset generation: reads design system presets and generated
 * Storyblok component schemas, transforms preset args into Storyblok format
 * (adds _uid / component typing for bloks fields, flattens nested objects,
 * strips unknown properties), and writes presets.123456.json.
 *
 * No API calls, no asset uploads — image paths stay local.
 *
 * Usage:
 *   node scripts/generatePresets.js
 *
 * Also importable:
 *   const { generatePresets } = require("./generatePresets");
 *   const presets = generatePresets();
 */

const fs = require("node:fs");
const path = require("node:path");
const { traverse } = require("object-traversal");
const { v4: uuidv4 } = require("uuid");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const presetIdToComponentName = (id) =>
  id
    .split("--")
    .shift()
    .split("-")
    .slice(1)
    .join("-")
    .replaceAll("archetypes-", "");

const normalizeComponentName = (name) =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

// Component props that are named differently from the Storyblok field they
// map to: the split-weighted component exposes `mainComponents` /
// `asideComponents` as the React node props `main` / `aside`.
const FIELD_ALIASES = {
  "split-weighted": { main: "mainComponents", aside: "asideComponents" },
};

/** React element trees are recognised by their `props` + `_owner` pair. */
const isReactElement = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  "props" in value &&
  "_owner" in value;

/**
 * Replace React element trees with plain Storyblok blok entries. A fragment
 * contributes its children, a component element becomes a single entry whose
 * `component` is the element's (display) name.
 */
const convertReactNodes = (node) => {
  if (Array.isArray(node)) return node.flatMap(convertReactNodes);
  if (!node || typeof node !== "object") return node;

  if (isReactElement(node)) {
    const { children, ...props } = convertReactNodes(node.props || {});
    if (typeof node.type !== "string") {
      if (children === undefined) return [];
      return Array.isArray(children) ? children : [children];
    }
    return [{ component: node.type, ...props }];
  }

  const converted = {};
  for (const [key, value] of Object.entries(node)) {
    converted[key] = convertReactNodes(value);
  }
  return converted;
};

/** Flatten nested objects to the `key_subkey` shape the CMS schema uses. */
const flattenNestedObjects = (node) => {
  traverse(node, ({ parent, key, value }) => {
    if (typeof value === "object" && isNaN(key) && !Array.isArray(value)) {
      for (const [propKey, propValue] of Object.entries(value)) {
        parent[`${key}_${propKey}`] = propValue;
      }
      delete parent[key];
    }
  });
};

/**
 * Resolve the component of a single blok entry: an explicit component name
 * wins, otherwise the entry's (display) name is matched against the field's
 * whitelist. Fields that allow exactly one component always use it.
 */
const resolveBlokComponent = (entry, whitelist, componentsList) => {
  if (whitelist.length === 1) return whitelist[0];

  const candidates = [entry.component, entry.type].filter(
    (candidate) => typeof candidate === "string",
  );

  for (const candidate of candidates) {
    if (whitelist.includes(candidate)) return candidate;

    const normalized = normalizeComponentName(candidate);
    const match = whitelist.find((name) => {
      // `tab-*` entries are CMS tab fields, never content components
      if (name.startsWith("tab-")) return false;
      const component = componentsList.find((c) => c.name === name);
      if (!component) return false;
      return [component.name, component.display_name, component.real_name].some(
        (componentName) =>
          componentName &&
          normalizeComponentName(componentName) === normalized,
      );
    });

    if (match) return match;
  }

  return undefined;
};

/**
 * The single text field of a component schema. Scalar blok entries (e.g. the
 * tag labels of `event-list-teaser.tags`) are stored in it.
 */
const firstTextField = (component) => {
  if (!component?.schema) return undefined;

  return Object.keys(component.schema).find(
    (key) => component.schema[key].type === "text",
  );
};

/**
 * Wrap single-object values of `bloks` fields in arrays. Flattening runs
 * before the schema pass and would turn such an object into `key_subkey` pairs
 * that `applySchema` then drops as unknown fields; recursing into each entry
 * with its component schema keeps nested single-object bloks fields (e.g. a
 * blog aside's author) intact as well.
 */
const normalizeBlokFields = (node, schema, componentsList) => {
  if (!node || typeof node !== "object" || Array.isArray(node)) return;

  for (const [key, value] of Object.entries(node)) {
    if (key === "_uid" || key === "component") continue;

    const field = schema ? schema[key] : undefined;
    if (field?.type !== "bloks") continue;

    const entries = Array.isArray(value) ? value : [value];
    node[key] = entries;

    const whitelist = field.component_whitelist || [];
    for (const entry of entries) {
      if (!entry || typeof entry !== "object") continue;

      const componentName = resolveBlokComponent(
        entry,
        whitelist,
        componentsList,
      );
      const child = componentsList.find((c) => c.name === componentName);
      normalizeBlokFields(entry, child?.schema, componentsList);
    }
  }
};

/**
 * Type blok entries, recurse into their component schemas and drop every
 * field the component schema does not define.
 */
const applySchema = (node, schema, componentsList) => {
  if (!node || typeof node !== "object" || Array.isArray(node)) return;

  for (const key of Object.keys(node)) {
    if (key === "_uid" || key === "component") continue;

    const value = node[key];
    const field = schema ? schema[key] : undefined;

    if (field?.type === "bloks") {
      const whitelist = field.component_whitelist || [];
      node[key] = (Array.isArray(value) ? value : [value])
        .map((entry) => {
          if (entry === null || entry === undefined) return null;

          // Scalar entries come from bloks fields whose design system source
          // is a plain list of labels (e.g. `event-list-teaser.tags`). They can
          // only be typed when the field allows exactly one component: its
          // single text field carries the value.
          if (typeof entry !== "object") {
            if (whitelist.length !== 1) {
              throw new Error(
                `Cannot map scalar blok entry ${JSON.stringify(
                  entry,
                )} of "${key}": the field allows ${whitelist.length} components`,
              );
            }

            const componentName = whitelist[0];
            const textField = firstTextField(
              componentsList.find((c) => c.name === componentName),
            );
            if (!textField) {
              throw new Error(
                `Cannot map scalar blok entry ${JSON.stringify(
                  entry,
                )} of "${key}": component "${componentName}" has no text field`,
              );
            }

            return {
              _uid: uuidv4(),
              component: componentName,
              [textField]: entry,
            };
          }

          const componentName = resolveBlokComponent(
            entry,
            whitelist,
            componentsList,
          );
          if (!componentName) return null;

          const typed = { _uid: uuidv4(), component: componentName };
          for (const [property, propertyValue] of Object.entries(entry)) {
            if (property === "_uid" || property === "component") continue;
            typed[property] = propertyValue;
          }

          const child = componentsList.find((c) => c.name === componentName);
          applySchema(typed, child?.schema, componentsList);
          return typed;
        })
        .filter(Boolean);
      continue;
    }

    if (field) continue;

    delete node[key];
  }
};

// ---------------------------------------------------------------------------
// Core generation
// ---------------------------------------------------------------------------

/**
 * Generate Storyblok presets from design system presets.
 *
 * @param {object} [options]
 * @param {string} [options.componentsPath] - Path to generated components JSON
 * @param {string} [options.outputPath]     - Path to write presets JSON
 * @param {boolean} [options.writeFile=true] - Whether to write the output file
 * @returns {Record<string, object>} presets keyed by preset ID
 */
function generatePresets(options = {}) {
  const {
    componentsPath = path.join(
      __dirname,
      "..",
      "cms",
      "components.123456.json",
    ),
    outputPath = path.join(__dirname, "..", "cms", "presets.123456.json"),
    writeFile = true,
  } = options;

  const designSystemPresets = require("@kickstartds/design-system/presets.json");

  const generatedRaw = JSON.parse(fs.readFileSync(componentsPath, "utf-8"));
  const componentsList = generatedRaw.components || generatedRaw;

  const presets = {};
  let nextPresetId = 1;

  // -- Step 1: Create preset structures ------------------------------------

  for (const preset of designSystemPresets) {
    const componentKey = presetIdToComponentName(preset.id);
    const matchedComponent = componentsList.find(
      (component) => component.name === componentKey,
    );

    if (!matchedComponent) continue;

    presets[preset.id] = {
      id: nextPresetId++,
      name: preset.name,
      preset: {
        _uid: uuidv4(),
        component: componentKey,
        ...preset.args,
      },
      component_id: matchedComponent.id || 0,
      space_id: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      color: "",
      icon: "",
      description: "",
      image: preset.screenshot || "",
    };
  }

  // -- Step 2: Convert React trees, flatten, apply the component schema -----

  for (const [presetId, preset] of Object.entries(presets)) {
    const component = componentsList.find(
      (c) => c.name === presetIdToComponentName(presetId),
    );

    if (!component) continue;

    // 2a. Replace React element trees (split layout slots) with blok entries
    preset.preset = convertReactNodes(preset.preset);

    // 2b. Rename component props that differ from their Storyblok field
    const aliases = FIELD_ALIASES[component.name];
    if (aliases) {
      for (const [from, to] of Object.entries(aliases)) {
        if (from in preset.preset) {
          preset.preset[to] = preset.preset[from];
          delete preset.preset[from];
        }
      }
    }

    // 2c. Normalise single-object bloks values to arrays, so flattening below
    //     does not split them into `key_subkey` pairs the schema does not have
    normalizeBlokFields(preset.preset, component.schema, componentsList);

    // 2d. Flatten nested objects to key_subkey format
    flattenNestedObjects(preset.preset);

    // 2e. Type bloks entries and drop fields the schema does not define
    applySchema(preset.preset, component.schema, componentsList);
  }

  // -- Step 3: Write output ------------------------------------------------

  const presetArray = Object.values(presets);

  if (writeFile) {
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ presets: presetArray }, null, 2),
    );
    console.log(`Generated ${presetArray.length} presets → ${outputPath}`);
  }

  return presets;
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

if (require.main === module) {
  generatePresets();
}

module.exports = {
  generatePresets,
  presetIdToComponentName,
  FIELD_ALIASES,
};
