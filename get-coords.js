const request = require("request-promise-native");

const Location = require("./Classes/Location")

const POSTCODE_API = "https://api.postcodes.io";

function getCoords(postcode) {
    return request({uri:`${POSTCODE_API}/postcodes/${postcode}`, json: true})
    .then(function (response) {
        return new Location(response.result.latitude, response.result.longitude)
    })
    .catch((error) => {throw new Error(`postcodes api error (${error.message})`)});
}

module.exports = getCoords;