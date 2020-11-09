var config = {
    URL: 'http://localhost:9000/',
}

const API = {
    async makeApiPostCall(path, body, headers = {}) {
        const response = await fetch(config.URL + path,
            {
                method: 'POST',
                headers: headers,
                body: body
            }
        );
        return response.json();
    },

    async makeApiGetCall(path) {
        const response = await fetch(config.URL + path,
            {
                method: 'GET',
            }
        );
        return response.json();
    }
}

module.exports = API;