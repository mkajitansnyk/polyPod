import express, {Response, Router} from "express";
import {Server} from "http";
import {htmlSkeleton} from "./html";
import {once} from "events";
import {Pod} from "@polypoly-eu/poly-api";
import {RemoteServerPod} from "@polypoly-eu/podigree";
import {join} from "path";
import {rootDir} from "../_dir";
import {promises as fs} from "fs";
import {Manifest} from "@polypoly-eu/customs";
import {bootstrap} from "@polypoly-eu/feature-harness";

export interface Paths {
    reactPath: string;
    reactDomPath: string;
}

export const defaultPaths: Paths = {
    reactPath: join(rootDir, "dist/browser/react.development.js"),
    reactDomPath: join(rootDir, "dist/browser/react-dom.development.js")
};

async function sendFile(path: string, res: Response): Promise<void> {
    const contents = await fs.readFile(path, { encoding: "utf-8" });
    res.send(contents);
}

export async function serve(
    port: number,
    pod: Pod,
    rootDir: string,
    manifest: Manifest,
    paths: Paths = defaultPaths
): Promise<Server> {
    const app = express();

    const html = htmlSkeleton;

    app.get("/", (req, res) => {
        res.contentType("text/html");
        res.send(html);
    });

    // TODO use express.static?

    app.get("/feature.js", (req, res) => {
        res.contentType("text/javascript");
        sendFile(join(rootDir, manifest.jsPath), res);
    });

    app.get("/feature.css", (req, res) => {
        res.contentType("text/css");
        sendFile(join(rootDir, manifest.assetBasePath, manifest.cssPath), res);
    });

    app.get("/react.js", (req, res) => {
        res.contentType("text/javascript");
        sendFile(paths.reactPath, res);
    });

    app.get("/react-dom.js", (req, res) => {
        res.contentType("text/javascript");
        sendFile(paths.reactDomPath, res);
    });

    app.get("/bootstrap.js", (req, res) => {
        res.contentType("text/javascript");
        res.send(bootstrap);
    });

    app.use("/", express.static(join(rootDir, manifest.assetBasePath)));

    const rpcRouter = Router();
    const remotePod = new RemoteServerPod(pod);
    remotePod.listenOnRouter(rpcRouter);

    app.use("/rpc", rpcRouter);

    const server = app.listen(port);
    await once(server, "listening");
    return server;
}