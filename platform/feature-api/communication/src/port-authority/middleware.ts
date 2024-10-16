/**
 * Node-specific implementations of [[Port]] and [[ResponsePort]].
 *
 * @packageDocumentation
 */

import { OptionsJson, Options, json, raw } from "body-parser";
import createServer, { NextHandleFunction, HandleFunction } from "connect";
import { IncomingMessage, RequestListener } from "http";

import { Bubblewrap } from "..";

import { Handler, mapReceivePort } from "./port";
import { ResponsePort, WithResolvers } from "./procedure";
import { triedPromise, Try } from "./util";

/**
 * Creates a [[ResponsePort]] and an accompanying middleware that reacts on any `POST` request and responds with an
 * arbitrary object. Sending a `GET` request will act as a status check.
 *
 * The request's body type can be chosen freely by users. Ensure that
 * [body-parser](https://www.npmjs.com/package/body-parser) middleware or similar middleware is set up for the
 * appropriate content type in the router. Otherwise, handlers will receive an empty or ill-typed body. See
 * [[jsonRouterPort]] and [[bubblewrapRouterPort]] for convenience wrappers that handle conversions.
 *
 * Upon receiving a POST request, the resulting [[ResponsePort]] performs the following steps:
 *
 * 1. extract the body from the request
 * 2. create new [[PromiseResolvers]] callbacks and sends them together with the body to the first handler that has been
 *    registered
 * 3. when the callback is resolved, call the `format` function with a [[Success]] or [[Failure]] value
 * 4. send the formatted result with the specified content type as a HTTP 200 response
 *
 * Note that HTTP clients will always receive a 200 response. Both server and client need to agree on a suitable
 * application-level protocol how to map errors into a response body and back from it. The default client
 * ([[fetchPort]]) requires a parse function that should be an inverse to `format`.
 *
 * The resulting [[ResponsePort]] only calls the first handler that has been added. This is similar to [[liftServer]].
 *
 * @param contentType the HTTP content type of the response
 * @param format a function that converts a successful response or an error into a body; it should never throw
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function middlewarePort<T, Body = any>(
    contentType: string,
    format: (result: Try<T>) => Body
): [HandleFunction, ResponsePort<Body, T>] {
    let _handler: Handler<WithResolvers<Body, T>> | undefined = undefined;

    const middleware: NextHandleFunction = async (_request, response, next) => {
        if (_request.method === "GET") {
            // this is to signal that the endpoint exists
            response.writeHead(200);
            response.end();
            return;
        }

        if (_handler === undefined) return; // yolo

        const handler = _handler;
        const request = _request as IncomingMessage & { body: Body };

        if (request.method !== "POST") next();

        const result = await triedPromise(
            new Promise<T>((resolve, reject) => {
                handler({
                    request: request.body,
                    resolvers: { resolve, reject },
                });
            })
        );

        const body = format(result);

        response.setHeader("Content-Type", contentType);
        response.writeHead(200);
        response.write(body);
        response.end();
    };

    return [
        middleware,
        {
            addHandler: (handler) => {
                if (_handler === undefined) _handler = handler;
            },
        },
    ];
}

/**
 * Wrapper around [[middlewarePort]] set up for JSON communication. The content type is set to `application/json`.
 *
 * The formatting uses `JSON.stringify` to convert
 * the [[Try]] representing the outcome of the promise to a string. Conversely, incoming requests are parsed using
 * `JSON.parse`.
 */
export function jsonMiddlewarePort(
    options?: OptionsJson
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [RequestListener, ResponsePort<any, any>] {
    const contentType = "application/json";

    const server = createServer();

    server.use(
        json({
            ...options,
            strict: false,
            type: contentType,
        })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [handler, port] = middlewarePort<any, any>(
        contentType,
        JSON.stringify
    );

    server.use(handler);

    return [server, port];
}

/**
 * Wrapper around [[middlewarePort]] set up for raw byte stream communication. The content type is set to
 * `application/octet-stream`.
 *
 * The formatting uses standard Bubblewrap
 * encoding to convert the [[Try]] representing the outcome of the promise to a string. Conversely, incoming requests
 * are decoded using standard Bubblewrap decoding.
 */
export function bubblewrapMiddlewarePort(
    bubblewrap: Bubblewrap,
    options?: Options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [RequestListener, ResponsePort<any, any>] {
    const contentType = "application/octet-stream";

    const server = createServer();

    server.use(
        raw({
            ...options,
            type: contentType,
        })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [handler, rawPort] = middlewarePort<any, Buffer>(
        contentType,
        (value) => Buffer.from(bubblewrap.encode(value))
    );

    server.use(handler);

    const port = mapReceivePort(rawPort, (data) => ({
        resolvers: data.resolvers,
        request: bubblewrap.decode(data.request),
    }));

    return [server, port];
}
