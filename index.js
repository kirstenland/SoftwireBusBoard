const request = require("request-promise-native");
const readlineSync = require("readline-sync");

const getCoords = require("./get-coords");
const getBuses = require("./tfl-api/get-buses");

const getStops = require("./tfl-api/get-stops");

getCoords("NW5 1TL").then(getStops).then((stops) => {
    stops.forEach(getBuses)
});

//const stopCode = readlineSync.question("Enter a stop code:");
/*
request(`https://api.tfl.gov.uk/StopPoint/${stopCode}/arrivals`, function(error, response, body) {
    let buses = JSON.parse(body);
    buses.sort(function(bus1, bus2) {
        return bus1.timeToStation - bus2.timeToStation;
    })
    buses.splice(0,5).forEach(bus =>
        console.log(`${bus.lineName} ${(bus.timeToStation/60).toFixed(0)} minutes away`)
    );
})
*/