const request = require("axios");

// Get user repository data: https://hub.docker.com/v2/repositories/tobilg/
// Get image data: https://hub.docker.com/v2/repositories/tobilg/mini-webserver/
// Get image tags: https://hub.docker.com/v2/repositories/tobilg/mini-webserver/tags/

class Statistics {

    constructor (registryUrl) {
        this.registryUrl = registryUrl || "https://hub.docker.com/v2/repositories";
    }

    getUrl (url) {
        let results = [];
        function getPagedUrl(url) {
            return request.get(url).then(response => {
                // Get response body
                const body = response.data;
                // Add results to existing
                if (body.results) {
                    results = results.concat(body.results);
                } else {
                    results.push(body);
                }
                // Check if there's a next page
                if (body.next) {
                    return getPagedUrl(body.next);
                } else {
                    return results;
                }
            });
        }
        return getPagedUrl(url);
    }

    getUserData (userName) {
        return this.getUrl(`${this.registryUrl}/${userName}`);
    }

    getImageData (userName, imageName) {
        return this.getUrl(`${this.registryUrl}/${userName}/${imageName}`);
    }

    getImageTagData (userName, imageName) {
        return this.getUrl(`${this.registryUrl}/${userName}/${imageName}/tags/`);
    }

}

module.exports = Statistics;
