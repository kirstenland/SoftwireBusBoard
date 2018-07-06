const request = require("request-promise-native");

const BusStop = require("../Classes/BusStop")

const API_KEYS  =require("../api_keys");
const TFL_API ="https://api.tfl.gov.uk";

function getStops(location, radius) {
    const ENDPOINT = "/StopPoint";
    radius = radius | 500 //2km default

    request_options = {
        uri: TFL_API + ENDPOINT,
        qs: {
            app_id: API_KEYS.ID,
            app_key: API_KEYS.KEY,
            radius,
            lat: location.latitude,
            lon: location.longitude,
            stopTypes: ["NaptanOnstreetBusCoachStopPair","NaptanOnstreetBusCoachStopCluster","NaptanBusCoachStation"].join(",")
        },
        json: true
    }
    return request(request_options).then(response => response.stopPoints.map(stopPoint => new BusStop(stopPoint)));
}

module.exports = getStops;