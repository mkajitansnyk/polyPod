const path = require("path");
const fs = require("fs");

const validCommands = [
    "build",
    "clean",
    "install",
    "installAndBuild",
    "lint",
    "lintfix",
    "list",
    "list-deps",
    "offlineInstall",
    "syncdeps",
    "test",
];

function parseCommandLine() {
    const [, scriptPath, ...parameters] = process.argv;
    if (parameters.includes("--help")) return { scriptPath, command: null };

    const startIndex = parameters.indexOf("--start");
    if (startIndex > 0 && startIndex + 1 >= parameters.length)
        return { scriptPath, command: null };
    const start =
        startIndex !== -1 ? parameters.splice(startIndex, 2)[1] : null;

    if (parameters.length > 1) return { scriptPath, command: null };

    const command = parameters.length ? parameters[0] : "installAndBuild";
    return {
        scriptPath,
        command: validCommands.includes(command) ? command : null,
        start,
    };
}

function showUsage(scriptPath) {
    const baseName = path.basename(scriptPath);
    const validCommandString = validCommands.join(" | ");
    console.error(
        `Usage: ${baseName} [ --start PACKAGE_NAME ] [ ${validCommandString} ]`
    );
    console.error(" Run without arguments to build all packages");
}

function parseManifest(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (e) {
        throw `Cannot read ${path} or parse the result: ${e}`;
    }
}

module.exports = { parseCommandLine, showUsage, parseManifest };
