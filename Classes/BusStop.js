const chalk = require("chalk");
const getBuses = require("../tfl-api/get-buses");

class BusStop {
    constructor(api_response) {
        this.id = api_response.naptanId,
        this.commonName = api_response.commonName
    }
    toString() {
        return `STOP ${this.commonName}`
    }
    getArrivals() {
        return getBuses(this)
        .then(buses=>this.buses = buses.sort((a,b)=> a.timeToStation - b.timeToStation).splice(0,5))
        .then(()=>this);
    }
    prettyPrint() {
        console.log(chalk.green(this.toString()+":"));
        for (let bus of this.buses) {
            console.log("  "+bus.toString());
        }
    }
}

module.exports = BusStop;