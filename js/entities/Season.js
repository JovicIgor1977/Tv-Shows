class Season {
    constructor(premiereDate, endDate) {
        this.premiereDate = premiereDate
        this.endDate = endDate
    }

    getInfo() {
        if (this.premiereDate == null) {
            return 'Coming soon...'
        } else {
            return `${this.endDate} - ${this.premiereDate}`;
        }
    }
}
export default Season;