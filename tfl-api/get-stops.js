const request = require("request-promise-native");

const TFL_API ="https://api.tfl.gov.uk"


function getStops(location, radius) {
    radius = radius | 2000 //2km default
    return request(`${TFL_API}/StopPoints?radius=${radius}&lat=${location.latitude}&lon=${location.longitude}`)
}

module.exports = getStops;