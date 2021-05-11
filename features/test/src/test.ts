import {Pod, PolyIn, PolyOut} from "@polypoly-eu/pod-api";
import * as RDF from "rdf-js";

let quads: Array<RDF.Quad> = [];
let pod: Pod;
let polyOut: PolyOut;
let polyIn: PolyIn;

export function simpleJavaScriptCall() {
    console.log("simpleJavaScriptCall()");
}

export function awaitPodObject() {
    console.log(`pod: ${pod}`);
}

export async function simpleFetch() {
    console.log("simpleFetch()");
    await polyOut.fetch("https://httpbin.org/robots.txt");
}

export async function callFetchWithNoMethod() {
    console.log("callFetchWithNoMethod()");
    await polyOut.fetch("https://httpbin.org/robots.txt");
}

export async function callFetchWithPostMethod() {
    console.log("callFetchWithPostMethod()");
    await polyOut.fetch("http://httpbin.org/post", {method: "POST"});
}

export async function callFetchWithSingleHeaderInStringForm() {
    console.log("callFetchWithSingleHeaderInStringForm()");
    let key = getInput(1);
    let value = getInput(2);
    let headers = {};
    headers[key] = value;
    await polyOut.fetch("http://httpbin.org/headers", {headers: headers});
}

export async function callFetchWithMultipleHeadersInStringForm() {
    console.log("callFetchWithMultipleHeadersInStringForm()");
    let key1 = getInput(1);
    let value1 = getInput(2);
    let key2 = getInput(3);
    let value2 = getInput(4);
    let headers = {};
    headers[key1] = value1;
    headers[key2] = value2;
    await polyOut.fetch("http://httpbin.org/headers", {headers: headers});
}

export async function verifyBodyOfFetchResponse() {
    console.log("verifyBodyOfFetchResponse()");
    let response = await polyOut.fetch("http://httpbin.org/robots.txt");
    // TODO - how to handle/reject streams?
    let text = await response.text();
    setResult(text);
}

export async function verifyResponseStatusOfFetchCall() {
    console.log("verifyResponseStatusOfFetchCall()");
    let response = await polyOut.fetch("http://httpbin.org/robots.txt");
    if (typeof response.status === "number")
        setResult(response.status)
    else
        throw new TypeError(`response.ok is not a number, it is: '${typeof response.status}'`)
}

export async function verifyResponseOkOfFetchCall() {
    console.log("verifyResponseOkOfFetchCall()");
    let response = await polyOut.fetch("http://httpbin.org/robots.txt");
    if (typeof response.ok === "boolean")
        setResult(response.ok)
    else
        throw new TypeError(`response.ok is not a boolean, it is: '${typeof response.ok}'`)
}

export async function callFetchWithPostMethodAndBody() {
    console.log("callFetchWithPostMethodAndBOdy()");
    let body = getInput(1);
    await polyOut.fetch("http://httpbin.org/post", {method: "POST", body: body});
}

export async function canCallPolyInAddWithNoQuads() {
    console.log("canCallPolyInAddWithNoQuads()");
    await polyIn.add();
}

export async function canCallPolyInAddWithSingleQuad() {
    console.log("canCallPolyInAddWithSingleQuad()");
    const quad = QuadBuilder.fromInputs().build();
    await polyIn.add(quad);
}

export async function canCallPolyInAddWithMultipleQuads() {
    console.log(`canCallPolyInAddWithMultipleQuads(), quads: '${quads}'`);
    await polyIn.add(...quads);
}

export async function addSupportsQuadsWithNamedNodeSubject() {
    console.log(`addSupportsQuadsWithNamedNodeSubject()`);
    const quad = QuadBuilder.fromInputs().build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithBlankNodeSubject() {
    console.log(`addSupportsQuadsWithBlankNodeSubject()`);
    let subject = getInput(1);
    const quad = QuadBuilder.fromInputs()
        .withSubject(window.pod.dataFactory.blankNode(subject))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithNamedNodeObject() {
    console.log(`addSupportsQuadsWithNamedNodeObject()`);
    let object = getInput(3);
    const quad = QuadBuilder.fromInputs()
        .withObject(window.pod.dataFactory.namedNode(object))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithBlankNodeObject() {
    console.log(`addSupportsQuadsWithBlankNodeObject()`);
    let object = getInput(3);
    const quad = QuadBuilder.fromInputs()
        .withObject(window.pod.dataFactory.blankNode(object))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithLiteralObject() {
    console.log(`addSupportsQuadsWithLiteralObject()`);
    let object = getInput(3);
    const quad = QuadBuilder.fromInputs()
        .withObject(window.pod.dataFactory.literal(object))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithNamedNodeGraph() {
    console.log(`addSupportsQuadsWithNamedNodeGraph()`);
    let graph = getInput(4);
    const quad = QuadBuilder.fromInputs()
        .withGraph(window.pod.dataFactory.namedNode(graph))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithBlankNodeGraph() {
    console.log(`addSupportsQuadsWithBlankNodeGraph()`);
    let graph = getInput(4);
    const quad = QuadBuilder.fromInputs()
        .withGraph(window.pod.dataFactory.blankNode(graph))
        .build();
    await polyIn.add(quad);
}

export async function addSupportsQuadsWithDefaultGraph() {
    console.log(`addSupportsQuadsWithDefaultGraph()`);
    const quad = QuadBuilder.fromInputs()
        .withGraph(window.pod.dataFactory.defaultGraph())
        .build();
    await polyIn.add(quad);
}

export async function canPassEmptyMatcherToPolyInSelect() {
    console.log("canPassEmptyMatcherToPolyInSelect()");
    await polyIn.select({});
}

export async function canPassMatcherWithSubjectToPolyInSelect() {
    console.log("canPassMatcherWithSubjectToPolyInSelect()");
    const subject = getInput(1);
    let matcher = {subject: window.pod.dataFactory.namedNode(subject)};
    await polyIn.select(matcher);
}

export async function canPassMatcherWithPredicateToPolyInSelect() {
    console.log("canPassMatcherWithPredicateToPolyInSelect()");
    const predicate = getInput(1);
    let matcher = {predicate: window.pod.dataFactory.namedNode(predicate)};
    await polyIn.select(matcher);
}

export async function canPassMatcherWithObjectToPolyInSelect() {
    console.log("canPassMatcherWithObjectToPolyInSelect()");
    const object = getInput(1);
    let matcher = {object: window.pod.dataFactory.namedNode(object)};
    await polyIn.select(matcher);
}

export async function canPassMatcherWithAllThreeFieldsToPolyInSelect() {
    console.log("canPassMatcherWithAllThreeFieldsToPolyInSelect()");
    const subject = getInput(1);
    const predicate = getInput(2);
    const object = getInput(3);
    let dataFactory = window.pod.dataFactory;
    let matcher = {subject: dataFactory.namedNode(subject), predicate: dataFactory.namedNode(predicate), object: dataFactory.namedNode(object)};
    await polyIn.select(matcher);
}

export async function canGetEmptyArrayFromPolyInSelect() {
    console.log("canGetEmptyArrayFromPolyInSelect()");
    let result = await polyIn.select({});
    if (!Array.isArray(result) || result.length !== 0)
        throw Error(`Expected empty array, got '${JSON.stringify(result)}'`);
}

export async function canGetArrayWithSingleQuadFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0]).build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithNamedNodeSubjectFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithNamedNodeSubjectFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withSubject(pod.dataFactory.namedNode(quads[0].subject.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithBlankNodeSubjectFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithBlankNodeSubjectFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withSubject(pod.dataFactory.blankNode(quads[0].subject.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithNamedNodeObjectFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithNamedNodeObjectFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withObject(pod.dataFactory.namedNode(quads[0].object.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithBlankNodeObjectFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithBlankNodeObjectFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withObject(pod.dataFactory.blankNode(quads[0].object.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithLiteralObjectFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithLiteralObjectFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withObject(pod.dataFactory.literal(quads[0].object.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithNamedNodeGraphFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithNamedNodeGraphFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withGraph(pod.dataFactory.namedNode(quads[0].graph.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithBlankNodeGraphFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithBlankNodeGraphFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withGraph(pod.dataFactory.blankNode(quads[0].graph.value))
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithSingleQuadWithDefaultGraphFromPolyInSelect() {
    console.log("canGetArrayWithSingleQuadWithDefaultGraphFromPolyInSelect()");
    const expectedResult = QuadBuilder.fromQuad(quads[0])
        .withGraph(pod.dataFactory.defaultGraph())
        .build();
    let result = await polyIn.select({});
    if (result.length !== 1)
        throw Error(`Expected array with 1 element, got ${result.length} elements`);
    if (!result[0].equals(expectedResult))
        throw Error(`Expected element equal to '${JSON.stringify(expectedResult)}', got '${JSON.stringify(result[0])}'`);
}

export async function canGetArrayWithMultipleQuadsFromPolyInSelect() {
    console.log("canGetArrayWithMultipleQuadsFromPolyInSelect()");
    let result = await polyIn.select({});
    if (result.length !== 2)
        throw Error(`Expected array with 2 elements, got ${result.length} elements`);
    if (!result[0].equals(quads[0]) && !result[1].equals(quads[0]))
        throw Error(`Expected one element equal to '${JSON.stringify(quads[0])}', none found, whole result: '${JSON.stringify(result)}'`);
    if (!result[0].equals(quads[1]) && !result[1].equals(quads[1]))
        throw Error(`Expected one element equal to '${JSON.stringify(quads[1])}', none found, whole result: '${JSON.stringify(result)}'`);
}

export function clearQuadCollection() {
    console.log(`clearQuadCollection()`);
    quads = [];
}

export function addQuadToCollection() {
    console.log(`addQuadToCollection(), current value: '${quads}'`);
    const quad = QuadBuilder.fromInputs().build();
    quads.push(quad);
}

export async function execute(test: () => void) {
    setStatus("Running...");
    pod = await awaitPodApi();
    polyIn = pod.polyIn;
    polyOut = pod.polyOut;
    try {
        await test();
        setStatus("All OK");
    } catch (e) {
        console.log(`Something went wrong: ${e}`);
        setStatus(`Failed: ${e.message}`);
    }
}

function setStatus(status) {
    console.debug(`Setting status: '${status}'`);
    document.getElementById("status").innerText = status;
}

async function awaitPodApi(): Promise<Pod> {
    return new Promise(resolve => {
        let timerId;
        timerId = setInterval(() => {
            if (window.pod !== null && window.pod !== undefined) {
                console.log("Got the Pod, clearing...");
                clearInterval(timerId);
                resolve(window.pod);
            }
        }, 100);
    });
}

function getInput(i): string {
    return (document.getElementById(`input.${i}`) as HTMLInputElement).value;
}

function setResult(result) {
    console.debug(`Setting result: '${result}'`);
    document.getElementById("result").innerText = result;
}

class QuadBuilder {
    private subject: RDF.Quad_Subject;
    private readonly predicate: RDF.Quad_Predicate;
    private object: RDF.Quad_Object;
    private graph: RDF.Quad_Graph;

    constructor(subject: RDF.Quad_Subject, predicate: RDF.Quad_Predicate, object: RDF.Quad_Object, graph: RDF.Quad_Graph) {
        this.subject = subject;
        this.predicate = predicate;
        this.object = object;
        this.graph = graph;
    }

    static fromInputs(): QuadBuilder {
        let dataFactory = window.pod.dataFactory;
        let subject = dataFactory.namedNode(getInput(1));
        let predicate = dataFactory.namedNode(getInput(2));
        let object = dataFactory.namedNode(getInput(3));
        let graph = dataFactory.namedNode(getInput(4));
        return new QuadBuilder(subject, predicate, object, graph);
    }

    static fromQuad(quad: RDF.Quad): QuadBuilder {
        let subject = quad.subject;
        let predicate = quad.predicate;
        let object = quad.object;
        let graph = quad.graph;
        return new QuadBuilder(subject, predicate, object, graph);
    }

    withSubject(subject: RDF.Quad_Subject): QuadBuilder {
        this.subject = subject;
        return this;
    }

    withObject(object: RDF.Quad_Object): QuadBuilder {
        this.object = object;
        return this;
    }

    withGraph(graph: RDF.Quad_Graph): QuadBuilder {
        this.graph = graph;
        return this;
    }

    build(): RDF.Quad {
        return window.pod.dataFactory.quad(this.subject, this.predicate, this.object, this.graph);
    }
}
