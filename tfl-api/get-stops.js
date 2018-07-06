const tflApi = require("./Tfl-api");
const BusStop = require("../Classes/BusStop")

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