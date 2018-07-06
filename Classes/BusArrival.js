class BusArrival {
    constructor(api_response) {
        this.lineName = api_response.lineName;
        this.timeToStation = api_response.timeToStation;
        this.destinationName = api_response.destinationName;
    }

    toString() {
        return `${this.lineName} to ${this.destinationName} arriving in ${(this.timeToStation/60).toFixed(0)} minutes`
    }
}

module.exports = BusArrival;