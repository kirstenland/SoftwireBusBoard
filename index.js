const readlineSync = require("readline-sync");

const getCoords = require("./get-coords");
const tflApi = require("./tfl-api/Tfl-api");

const express = require('express')
const app = express()

const portNumber = 3000;

app.use(express.static('frontend'));
app.use('/bus/:line', express.static('frontend/bus.html'));

app.get('/departureBoards/:postcode', function(req, res) {
    let postcode = req.params.postcode;

    getCoords(postcode) //NW5 1TL
        .then(tflApi.getStops)
        .then(stops => stops.splice(0,2))
        .then(stops => Promise.all(stops.map(tflApi.getArrivals)))
        .then(stops => res.send(stops))
        .catch(error => {
            console.log(error);
            res.status(500);
            res.send(error.message);
        });
})
app.get('/tubeDisruptions', function(req, res) {
    tflApi.getModeDisruption("tube")
        .then(disruptions => res.send(disruptions))
        .catch(error => {
            console.log(error);
            res.status(500);
            res.send(error.message);
        });
});

app.get('/api/bus/:number', function(req, res) {
    tflApi.getStopesOnRoute(req.params.number)
        .then(route => res.send(route))
        .catch(error => {
            console.log(error);
            res.status(500);
            res.send(error.message);
        });
})

app.listen(portNumber)
console.log(`Listening to port ${portNumber}`);