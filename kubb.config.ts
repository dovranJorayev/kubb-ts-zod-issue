import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginOas } from "@kubb/plugin-oas";

import {
  customKebabCase, customUpperCamelCase
} from "./src/lib";
import * as fs from "node:fs";
import * as path from "node:path";

const docsPath = path.join(__dirname, "docs.json");
const docsData = fs.readFileSync(docsPath, "utf8");

export default defineConfig({
  root: ".",
  input: { data: docsData, },
  output: {
    path: "./generated",
    clean: true,
    extension: {
      ".ts": "",
      ".d.ts": ".d.ts",
    },
  },
  hooks: { done: [ "prettier --write generated/**/*.ts", ], },
  plugins: [
    pluginTs({
      output: { path: "./types", },
      group: {
        type: "tag",
        name: ({ group }) => `${group.toLowerCase()}`,
      },
      syntaxType: "type",
      transformers: {
        name: (name, type) => {
          switch (type) {
          case "file": {
            return customKebabCase(name);
          }
          default: return name;
          }
        }
      },
      oasType: false
    }),
    pluginZod({
      output: { path: "./schemas", },
      group: {
        type: "tag",
        name: ({ group }) => customKebabCase(group),
      },
      // typed: true,
      dateType: "date",
      unknownType: "unknown",
      importPath: "zod",
      transformers: {
        name: (name, type) => {
          switch (type) {
          case "file": {
            return customKebabCase(name);
          }
          case "type":
          case "const": {
            // NOTE: This transformation is not applied for reason of ignoring it by zod plugin itself
            return customUpperCamelCase(name);
          }
          default: return name;
          }
        },
        schema (props, defaultSchemas) {


          /*
           * console.log("=== SCHEMA TRANSFORMER START ===");
           * console.log(JSON.stringify(props, null, 2), JSON.stringify(defaultSchemas, null, 2));
           * console.log("=== SCHEMA TRANSFORMER END ===");
           */

          // props.schema?.properties;
          return defaultSchemas;
        },
      }
    }),
    pluginOas(),
  ],
});

