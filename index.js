const readlineSync = require("readline-sync");

const getCoords = require("./get-coords");
const getStops = require("./tfl-api/get-stops");

let postcode = readlineSync.question("Postcode: ")

getCoords(postcode) //NW5 1TL
.then(getStops)
.then(stops => stops.splice(0,2))
.then(stops => Promise.all(stops.map(stop=>stop.getArrivals())))
.then(stops => stops.forEach((stop) => stop.prettyPrint()));