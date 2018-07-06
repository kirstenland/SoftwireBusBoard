const tflApi = require('./Tfl-api')
const BusArrival = require('../Classes/BusArrival')

function getBuses(busStop){
    return tflApi.apiCall(`/StopPoint/${busStop.id}/arrivals`)
    .then(buses => {if (buses.length === 0) throw new Error(`No buses found at ${busStop.id}`); return buses;})
    .then(buses =>
        buses.map( bus => new BusArrival(bus)));
}

module.exports = getBuses;