#!/usr/bin/env node

// Explore the structure of existing JSON files representing the structure of the filesystem in (possibly edited) FB zip files

import glob from "glob";
import { readFileSync } from "fs";

// Files are included in a local .data folder
const localFolder = ".data";

glob(`${localFolder}/*.json`, (error, files) => {
    if (error)
        throw Error(`Some problem reading files in data folder: ${error}`);
    let allKeys = new Set();
    let localKeys = [];
    files.forEach((f) => {
        let theseKeys = [];
        let thisData = JSON.parse(readFileSync(f));
        extractKeys("", thisData, theseKeys, allKeys);
        localKeys.push(theseKeys);
    });
    let commonKeys = localKeys[0].filter((key) => localKeys[1].includes(key));
    for (let i = 2; i < localKeys.length; i++) {
        commonKeys = commonKeys.filter((key) => localKeys[i].includes(key));
    }
    console.log("Common keys →\n", commonKeys.sort());
    console.log("All keys →\n", Array.from(allKeys).sort());
});

function extractKeys(prefix, data, theseKeys, allKeys) {
    for (let key in data) {
        if (key != "leaves") {
            theseKeys.push(`${prefix}${key}`);
            allKeys.add(`${prefix}${key}`);
            extractKeys(`${prefix}${key}/`, data[key], theseKeys, allKeys);
        }
    }
}
