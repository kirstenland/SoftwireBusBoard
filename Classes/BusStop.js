const chalk = require("chalk");

class BusStop {
    constructor(api_response) {
        this.id = api_response.naptanId,
        this.commonName = api_response.commonName
    }
    toString() {
        return `STOP ${this.commonName}`
    }
    prettyPrint() {
        console.log(chalk.green(this.toString()+":"));
        for (let bus of this.buses) {
            console.log("  "+bus.toString());
        }
    }
}

module.exports = BusStop;