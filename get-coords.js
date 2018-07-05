const request = require("request-promise-native");

const Location = require("./Classes/Location")

const POSTCODE_API = "https://api.postcodes.io";

function getCoords(postcode) {
    return request(`${POSTCODE_API}/postcodes/${postcode}`).then(function (response) {
        const result = JSON.parse(response).result
        return new Location(result.latitude, result.longitude)
    });
}

module.exports = getCoords;