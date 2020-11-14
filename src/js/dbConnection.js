var config = {
    URL: 'http://localhost:9000/',
}

const API = {
    async makeApiPostCall(path, body) {
        const response = await fetch(config.URL + path,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
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