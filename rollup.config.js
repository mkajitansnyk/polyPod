import sucrase from "@rollup/plugin-sucrase";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.es.js",
                format: "esm"
            },
            {
                file: "dist/index.js",
                format: "cjs"
            }
        ],
        plugins: [
            sucrase({
                exclude: ["node_modules/**"],
                transforms: ["typescript"]
            })
        ],
        external: [
            "body-parser"
        ]
    },
    {
        input: "src/specs/index.ts",
        output: [
            {
                file: "dist/specs/index.es.js",
                format: "esm"
            },
            {
                file: "dist/specs/index.js",
                format: "cjs"
            }
        ],
        plugins: [
            sucrase({
                exclude: ["node_modules/**"],
                transforms: ["typescript"]
            })
        ],
        external: [
            "chai",
            "chai-as-promised",
            "fast-check"
        ]
    }
];
