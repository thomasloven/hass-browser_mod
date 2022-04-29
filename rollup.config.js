import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const dev = process.env.ROLLUP_WATCH;

module.exports = [
  {
    input: "js/plugin/main.ts",
    output: {
      file: "custom_components/browser_mod/browser_mod.js",
      format: "es",
    },
    plugins: [
      nodeResolve(),
      json(),
      typescript(),
      babel({
        exclude: "node_modules/**",
      }),
      !dev && terser({ format: { comments: false } }),
    ],
  },
  {
    input: "js/config_panel/main.ts",
    output: {
      file: "custom_components/browser_mod/browser_mod_panel.js",
      format: "es",
    },
    plugins: [
      nodeResolve(),
      json(),
      typescript(),
      babel({
        exclude: "node_modules/**",
      }),
      !dev && terser({ format: { comments: false } }),
    ],
  },
];
