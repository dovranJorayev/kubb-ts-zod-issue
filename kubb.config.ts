import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginOas } from "@kubb/plugin-oas";
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
    }),
    pluginZod({
      output: { path: "./schemas", },
      unknownType: "unknown",
    }),
    pluginOas(),
  ],
});

