const request = require('request-promise-native');

const API_KEYS = require('../api_keys');

class TflApi {
    constructor() {
        this.TFL_API = "https://api.tfl.gov.uk";
        this.API_KEYS = API_KEYS;
    }

    apiCall(endpoint, options) {
        options = options || {};
        request_options = {
            uri: this.TFL_API + endpoint,
            qs: Object.assign(options, this.API_KEYS),
            json:true
        }
        return request(request_options).catch(error => {throw new Error(console.error(`TFL api error (${error})`))})

    }
}

module.exports = new TflApi;