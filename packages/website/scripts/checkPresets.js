/**
 * checkPresets.js
 *
 * Validates the generated Storyblok presets against the generated component
 * config: every preset must target a component that exists, every field must be
 * defined by that component's schema and every blok entry must carry a `_uid`
 * and a `component` from the field's whitelist.
 *
 * This is the "regenerated config is clean" check — it runs offline, no
 * Storyblok credentials involved.
 *
 * Usage:
 *   node scripts/checkPresets.js
 */

const fs = require("node:fs");
const path = require("node:path");
const {
  presetIdToComponentName,
  FIELD_ALIASES,
} = require("./generatePresets");

const designSystemPresets = require("@kickstartds/design-system/presets.json");

const componentsPath = path.join(
  __dirname,
  "..",
  "cms",
  "components.123456.json",
);
const presetsPath = path.join(__dirname, "..", "cms", "presets.123456.json");

const STORYBLOK_PROPERTIES = ["_uid", "component"];

/**
 * Walk a preset node against its component schema, collecting every reference
 * to a component or field that does not exist.
 */
const collectErrors = (node, schema, componentsByName, location, errors) => {
  if (Array.isArray(node)) {
    node.forEach((entry, index) =>
      collectErrors(entry, schema, componentsByName, `${location}/${index}`, errors),
    );
    return;
  }

  if (!node || typeof node !== "object") return;

  for (const [key, value] of Object.entries(node)) {
    if (STORYBLOK_PROPERTIES.includes(key)) continue;

    const field = schema ? schema[key] : undefined;

    if (field?.type === "bloks") {
      if (!Array.isArray(value)) {
        errors.push(`${location}/${key}: expected an array of bloks`);
        continue;
      }

      const whitelist = field.component_whitelist || [];
      value.forEach((entry, index) => {
        const entryLocation = `${location}/${key}/${index}`;
        if (!entry || typeof entry !== "object") {
          errors.push(`${entryLocation}: expected a blok entry`);
          return;
        }
        if (!entry._uid) errors.push(`${entryLocation}: missing _uid`);
        if (!entry.component) {
          errors.push(`${entryLocation}: missing component`);
          return;
        }
        if (!whitelist.includes(entry.component)) {
          errors.push(
            `${entryLocation}: component "${entry.component}" is not allowed by ${key}`,
          );
        }

        const component = componentsByName.get(entry.component);
        if (!component) {
          errors.push(
            `${entryLocation}: component "${entry.component}" does not exist`,
          );
          return;
        }

        collectErrors(entry, component.schema, componentsByName, entryLocation, errors);
      });
      continue;
    }

    if (field) continue;

    errors.push(`${location}/${key}: field does not exist`);
  }
};

/**
 * Flatten nested objects to `key_subkey` pairs the way `generatePresets()`
 * does, so a bloks field can be compared with the design system source it came
 * from.
 */
const flattenArgs = (value, prefix = "") => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const flat = {};
    for (const [key, child] of Object.entries(value)) {
      Object.assign(flat, flattenArgs(child, prefix ? `${prefix}_${key}` : key));
    }
    return flat;
  }

  return { [prefix]: value };
};

/**
 * A field the component schema defines must survive generation. Flattening
 * turns nested objects into `key_subkey` pairs and `applySchema` drops every
 * field it does not know, so a bug there silently empties a field instead of
 * erroring — check the regenerated body against the design system preset it
 * came from.
 */
const collectDroppedFields = (sourceArgs, preset, component, location, errors) => {
  const aliases = FIELD_ALIASES[component.name] || {};
  const bodyKeys = Object.keys(preset);

  for (const key of Object.keys(sourceArgs)) {
    const fieldName = aliases[key] || key;
    if (!component.schema[fieldName]) continue; // prop without a schema field

    const present =
      bodyKeys.includes(fieldName) ||
      bodyKeys.some((bodyKey) => bodyKey.startsWith(`${fieldName}_`));
    if (!present) {
      errors.push(
        `${location}: schema field "${fieldName}" is missing from the preset body`,
      );
    }
  }

  // Presence alone is not enough: an untypable bloks field keeps its key but
  // ends up empty (`tags: []`). Compare the entry count with the source list.
  for (const [key, value] of Object.entries(flattenArgs(sourceArgs))) {
    const fieldName = aliases[key] || key;
    const field = component.schema[fieldName];
    if (field?.type !== "bloks" || !Array.isArray(value)) continue;

    const generated = Array.isArray(preset[fieldName])
      ? preset[fieldName].length
      : 0;
    if (generated !== value.length) {
      errors.push(
        `${location}: bloks field "${fieldName}" has ${generated} entries but the design system preset has ${value.length}`,
      );
    }
  }
};

const checkPresets = () => {
  const componentsRaw = JSON.parse(fs.readFileSync(componentsPath, "utf-8"));
  const components = componentsRaw.components || componentsRaw;
  const componentsByName = new Map(components.map((c) => [c.name, c]));

  const presetsRaw = JSON.parse(fs.readFileSync(presetsPath, "utf-8"));
  const presets = presetsRaw.presets || presetsRaw;

  const errors = [];
  for (const preset of presets) {
    const location = `${preset.name} (${preset.preset?.component})`;
    const component = componentsByName.get(preset.preset?.component);
    if (!component) {
      errors.push(
        `${location}: component "${preset.preset?.component}" does not exist`,
      );
      continue;
    }
    collectErrors(preset.preset, component.schema, componentsByName, location, errors);
  }

  // `generatePresets()` keeps the design system preset order, so the committed
  // presets line up index by index with the source presets whose component
  // exists in the config.
  const sources = designSystemPresets.filter((source) =>
    componentsByName.has(presetIdToComponentName(source.id)),
  );

  if (sources.length !== presets.length) {
    errors.push(
      `presets: ${presets.length} committed presets but ${sources.length} design system presets match the component config — regenerate with \`pnpm --filter website create-storyblok-config\``,
    );
  } else {
    presets.forEach((preset, index) => {
      const source = sources[index];
      const location = `${preset.name} (${preset.preset?.component})`;

      if (presetIdToComponentName(source.id) !== preset.preset?.component) {
        errors.push(
          `${location}: out of sync with design system preset "${source.id}" — regenerate with \`pnpm --filter website create-storyblok-config\``,
        );
        return;
      }

      const component = componentsByName.get(preset.preset.component);
      collectDroppedFields(source.args, preset.preset, component, location, errors);
    });
  }

  if (errors.length > 0) {
    console.error(
      `${errors.length} preset error${errors.length === 1 ? "" : "s"} in ${presetsPath}:\n`,
    );
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(`Checked ${presets.length} presets — all clean`);
};

checkPresets();
