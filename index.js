const request = require("request-promise-native");
const readlineSync = require("readline-sync");

const getCoords = require("./get-coords");

getCoords("OX1 4AU").then(console.log);

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