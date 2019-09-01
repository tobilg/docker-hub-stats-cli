#!/usr/bin/env node

"use strict";

const program = require("commander");
const chalk = require("chalk");

const pkg = require("../package.json");
const Statistics = require("../lib/statistics");
const Formatter = require("../lib/formatter");

const icons = {
    ok: chalk.green("✓"),
    fail: chalk.red("✗")
};

const allowedFormats = ["csv", "tsv", "json"];

program
    .version(pkg.version)
    .usage("[options]")
    .option("-i, --image <imageName>", "get information about a specific Docker Hub image")
    .option("-u, --user <userName>", "get information about a Docker Hub user's images")
    .option("-t, --tags", "list the tags of a Docker Hub image")
    .option("-o, --output <format>", "define the output format (allowed values: csv, tsv, json). Default: json")
    .parse(process.argv);

if (program.hasOwnProperty("tags") && !program.hasOwnProperty("image")) {
    // Incomplete
    console.log(`${icons.fail} Please also specify the --image option`);
} else if (program.hasOwnProperty("output") && allowedFormats.indexOf(program.output.toLowerCase()) === -1) {
    // Wrong format
    console.log(`${icons.fail} Please specify a valid output format (one of csv, tsv, json)`);
} else if (program.hasOwnProperty("image") && program.image.indexOf("/") === -1) {
    console.log(`${icons.fail} Please specify a valid image name (Exampe 'user/image')`);
} else {

    const stats = new Statistics();
    const formatter = new Formatter();
    const output = program.output || "json";

    if (program.hasOwnProperty("tags") && program.hasOwnProperty("image")) {
        stats.getImageTagData('tobilg', 'mini-webserver').then(result => {
            formatter.format(output, "tags", result).then(output => {
                console.log(output);
            });
        });
    } else if (program.hasOwnProperty("image")) {
        const image = program.image.split("/");
        stats.getImageData(image[0], image[1]).then(result => {
            formatter.format(output, "image", result).then(output => {
                console.log(output);
            });
        });
    } else if (program.hasOwnProperty("user")) {
        stats.getUserData(program.user).then(result => {
            formatter.format(output, "user", result).then(output => {
                console.log(output);
            });
        });
    }
    
}

