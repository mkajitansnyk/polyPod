import * as tempy from "tempy";
import {promises as fs} from "fs";
import {join} from "path";
import {rootDir} from "../_dir";
import {spawnSync, SpawnSyncOptions} from "child_process";
import {FeatureConstructor} from "@polypoly-eu/poly-api";
import {createContext, runInContext} from "vm";
import {tempBundle} from "./util";

const globalFiles = [".npmrc"];

function installAndBuild(cli: string, path: string): void {
    const opts: SpawnSyncOptions = {
        cwd: path,
        env: {
            ...process.env,
            NODE_PATH: join(rootDir, "node_modules")
        }
    };

    expect(spawnSync("npm", ["install"], opts)).toHaveProperty("status", 0);
    expect(spawnSync("node", [cli, "build"], opts)).toHaveProperty("status", 0);
}

describe("Build", () => {

    let cliPath: string;

    beforeAll(async () => {
        cliPath = await tempBundle("cli");
    });

    describe("Simple build", () => {

        const projectPath = join(rootDir, "data", "test-feature-build");
        const testProjectFiles = ["index.js", "package.json", "style.scss"];

        let path: string;

        beforeAll(async () => {
            path = tempy.directory();
            for (const file of testProjectFiles)
                await fs.copyFile(join(projectPath, file), join(path, file));
            for (const file of globalFiles)
                await fs.copyFile(join(rootDir, file), join(path, file));
        });

        it("orodruin build", async () => {
            installAndBuild(cliPath, path);

            const distJS = await fs.readFile(join(path, "dist", "feature.js"), { encoding: "utf-8" });
            const console = {
                log: jest.fn()
            };

            const context = createContext({ console });
            runInContext(distJS, context);

            expect(context).toHaveProperty("Feature");

            const Feature: FeatureConstructor = context.Feature;

            new Feature().init(null!);

            expect(console.log).toHaveBeenCalledWith("Test");

            await fs.stat(join(path, "dist", "feature.css"));
        });
    });

});