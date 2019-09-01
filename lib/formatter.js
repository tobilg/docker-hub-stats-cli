const os = require("os");

class Formatter {

    constructor () {
    }

    format (outputType, inputType, data) {
        let self = this;
        return new Promise(function (resolve, reject) {

            let result = "";
            let formattedData;

            switch (inputType) {
                case "user":
                    formattedData = self.extractUserData(data);
                    break;
                case "image":
                    formattedData = self.extractUserData(data);
                    break;
                case "tags":
                    formattedData = self.extractTagsData(data);
                    break;
                default:
                    break;
            }

            switch (outputType) {
                case "json":
                    result = self.toJSON(formattedData);
                    break;
                case "csv":
                    result = self.toSV(formattedData, ",");
                    break;
                case "tsv":
                    result = self.toSV(formattedData, "\t");
                    break;
                default:
                    break;
            }

            resolve(result);

        });
    }

    toJSON (input) {
        return JSON.stringify(input.data);
    }

    toSV (input, separator) {
        let output = "";
        // Add header if exists
        if (input.hasOwnProperty("header")) output += input.header.join(separator) + os.EOL;
        // Add data
        input.data.forEach(entry => {
            const values = [];
            Object.getOwnPropertyNames(entry).forEach(property => {
                values.push(entry[property]);
            });
            output += values.join(separator) + os.EOL;
        });
        return output;
    }

    extractUserData (data) {
        let result = {
            header: ["user", "name", "starCount", "pullCount", "lastUpdateTimestamp", "description"],
            data: []
        };
        data.forEach(item => {
            result.data.push({
                user: item.user,
                name: item.name,
                starCount: item.star_count,
                pullCount: item.pull_count,
                lastUpdateTimestamp: item.last_updated,
                description: item.description,
            });
        });
        return result;
    }

    extractTagsData (data) {
        let result = {
            header: ["name", "size", "lastUpdateTimestamp"],
            data: []
        };
        data.forEach(item => {
            result.data.push({
                name: item.name,
                size: item.full_size,
                lastUpdateTimestamp: item.last_updated
            });
        });
        return result;
    }

}

module.exports = Formatter;
