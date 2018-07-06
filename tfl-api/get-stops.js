const request = require("request-promise-native");
const tflApi = require("./Tfl-api");

const BusStop = require("../Classes/BusStop")

const API_KEYS  =require("../api_keys");
const TFL_API ="https://api.tfl.gov.uk";

function getStops(location, radius) {
    request_options = {
            radius: radius | 500, // 500m default
            lat: location.latitude,
            lon: location.longitude,
            stopTypes: "NaptanPublicBusCoachTram"
        }
    return tflApi.apiCall("/StopPoint", request_options).then(response => response.stopPoints.map(stopPoint => new BusStop(stopPoint)));
}

module.exports = getStops;