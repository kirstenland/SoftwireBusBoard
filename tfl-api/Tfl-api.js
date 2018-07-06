const request = require('request-promise-native');

const BusStop = require("../Classes/BusStop");
const BusArrival = require("../Classes/BusArrival");

const API_KEYS = require('../api_keys');

class TflApi {
    constructor() {
        this.TFL_API = "https://api.tfl.gov.uk";
        this.API_KEYS = API_KEYS;

        this.getStops = this.getStops.bind(this);
        this.getArrivals = this.getArrivals.bind(this);
        this.getBuses = this.getBuses.bind(this);
    }

    apiCall(endpoint, options) {
        options = options || {};
        let request_options = {
            uri: this.TFL_API + endpoint,
            qs: Object.assign(options, this.API_KEYS),
            json:true
        }
        return request(request_options).catch(error => {throw new Error(console.error(`TFL api error (${error})`))})

    }
    
    getStops(location, radius) {
        let request_options = {
                radius: radius | 500, // 500m default
                lat: location.latitude,
                lon: location.longitude,
                stopTypes: "NaptanPublicBusCoachTram"
            }
        return this.apiCall("/StopPoint", request_options)
        .then(response => response.stopPoints.map(stopPoint => new BusStop(stopPoint)))
        .then(stopPoints => {if (stopPoints.length === 0) throw new Error(`No stops found at given location`); return stopPoints;});
    }

    getBuses(busStop){
        return this.apiCall(`/StopPoint/${busStop.id}/arrivals`)
        .then(buses => {if (buses.length === 0) throw new Error(`No buses found at ${busStop.id}`); return buses;})
        .then(buses =>
            buses.map( bus => new BusArrival(bus)));
    }

    getArrivals(busStop) {
        return this.getBuses(busStop)
        .then(buses => buses.sort((a,b)=> a.timeToStation - b.timeToStation).splice(0,5))
        .then(buses => busStop.buses = buses)
        .then(()=>busStop);
    }

    getModeDisruption(mode) {
        return this.apiCall(`/Line/Mode/${mode}/Disruption`).then(disruptions=>disruptions.map(disruption=>disruption.description));
    }
}

module.exports = new TflApi;