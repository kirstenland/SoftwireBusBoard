class BusStop {
    constructor(api_response) {
        this.id = api_response.id,
        this.commonName = api_response.commonName
    }
    toString() {
        return `STATION ${this.commonName} (${this.id})`
    }
}

module.exports = BusStop;