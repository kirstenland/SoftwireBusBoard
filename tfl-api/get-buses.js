const tflApi = require('./Tfl-api')

function getBuses(busStop){
    tflApi.apiCall(`/StopPoint/${busStop.id}/arrivals`).then(console.log);
}

module.exports = getBuses;