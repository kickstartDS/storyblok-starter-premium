/// <reference types="vite/client"/>
// @vitest-environment happy-dom

import path from "node:path";
import fs from "node:fs";
import fg from "fast-glob";
import { describe, expect, test } from "vitest";
import { ReactRenderer, composeStories } from "@storybook/react";
import { Store_CSFExports } from "@storybook/types";
import reactElementToJSXString from "react-element-to-jsx-string";
import { unpack, unpackDecorator } from "@kickstartds/core/lib/storybook";

const preview = {
  decorators: [unpackDecorator],
};

function getAllStoryFiles() {
  const storyFiles = Object.entries(
    import.meta.glob<Store_CSFExports<ReactRenderer>>(
      "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    )
  );

  return storyFiles.map(([filePath, storyFile]) => {
    const storyDir = path.dirname(filePath);
    const componentName = path
      .basename(filePath)
      .replace(/\.(stories)\.[^/.]+$/, "");
    return { filePath, storyFile, componentName, storyDir };
  });
}

type Snippet = {
  id: string;
  group: string;
  name: string;
  code: string;
  args: any;
  screenshot: string;
};

/**
 * Resolve a React element's component reference to its display name. Storybook
 * args can carry React element trees (e.g. the split layout's slot props) whose
 * `type` is a component object; `JSON.stringify` collapses that to `{}` and the
 * child component becomes unrecoverable for the Storyblok preset generator.
 */
const componentName = (type: unknown): string | undefined => {
  if (typeof type === "string") return type;
  if (typeof type === "function") return type.name || undefined;
  if (type && typeof type === "object") {
    if ("displayName" in type && typeof type.displayName === "string")
      return type.displayName;
    if ("render" in type) {
      const render = type.render;
      if (typeof render === "function") return render.name || undefined;
      if (
        render &&
        typeof render === "object" &&
        "displayName" in render &&
        typeof render.displayName === "string"
      )
        return render.displayName;
    }
  }
  return undefined;
};

/** Replace React element `type` references with their component display names. */
const resolveComponentTypes = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(resolveComponentTypes);
  if (!value || typeof value !== "object") return value;

  const resolved: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    resolved[key] =
      key === "type"
        ? componentName(entry) ?? entry
        : resolveComponentTypes(entry);
  }
  return resolved;
};

describe("Create Snippets", () => {
  const snippets: Snippet[] = [];
  const components: [string, string][] = [];
  const storyFiles = getAllStoryFiles();

  for (const storyFile of storyFiles) {
    describe(storyFile.componentName, async () => {
      const componentFileName = `${storyFile.storyDir.substring(1)}/${
        storyFile.componentName
      }Component`;

      if (fg.sync(componentFileName + ".[tj]sx")[0]) {
        components.push([storyFile.componentName, componentFileName]);
        const storyModule = await storyFile.storyFile();
        const composed = composeStories(storyModule, preview);

        for (const storyName in composed) {
          test.skipIf(!storyModule.default.title)(storyName, () => {
            const story = composed[storyName];
            const snippet: Snippet = {
              id: story.id,
              group: storyModule.default.title!,
              name: storyName,
              code: reactElementToJSXString(story()),
              args: resolveComponentTypes(unpack(story.args)),
              screenshot: `img/screenshots/${story.id}.png`,
            };
            snippets.push(snippet);
          });
        }
      } else {
        test.skip("Component file not found");
      }
    });
  }

  test("💾 write snippets.json & components.ts", () => {
    fs.writeFileSync("snippets.json", JSON.stringify(snippets, null, 2));
    fs.writeFileSync(
      "components.ts",
      components
        .map(
          ([componentName, componentFileName]) =>
            `export {${componentName}} from "${componentFileName}"; `
        )
        .join("\n")
    );
  });

  // The website preset generator copies every `screenshot` path into a preset's
  // `image`, so a story without a captured preview ships a preset without a
  // thumbnail. Fail here (the presets step of the design system build) instead
  // of in the Storyblok space, and name the stories whose previews are missing.
  test("🖼 every preset screenshot has been captured", () => {
    const missing = snippets
      .filter(
        ({ screenshot }) => !fs.existsSync(path.join("static", screenshot))
      )
      .map(({ id }) => id);
    expect(missing).toEqual([]);
  });
});
