import sucrase from "@rollup/plugin-sucrase";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.es.js",
                format: "esm",
            },
            {
                file: "dist/index.js",
                format: "cjs",
            },
        ],
        plugins: [
            sucrase({
                exclude: ["node_modules/**"],
                transforms: ["typescript"],
            }),
        ],
        external: [
            "@polypoly-eu/communication",
            "@polypoly-eu/communication/dist/port-authority/middleware",
            "@polypoly-eu/api",
        ],
    },
    {
        input: "src/bootstrap.ts",
        output: [
            {
                file: "dist/bootstrap.js",
                format: "iife",
            },
        ],
        context: "null",
        plugins: [
            resolve(),
            commonjs(),
            sucrase({
                exclude: ["node_modules/**"],
                transforms: ["typescript"],
            }),
        ],
        external: ["@polypoly-eu/communication/dist/port-authority/middleware"],
    },
];
