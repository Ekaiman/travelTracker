class Trips {
  constructor(id, tripData) {
    this.tripData = tripData;
    this.tripDataOneUser = tripData.filter((trip) => trip.userID === id);
    this.tripDataNumberDates;
  }

  returnDestinationId() {
    return this.tripDataOneUser.map((trip) => trip.destinationID);
  }

  getCostOfOneTrip(id, lodgingCost, flightCost) {
    const oneTrip = this.tripDataOneUser.find((trip) => trip.id === id);
    const dailyLodgingCost = oneTrip.duration * lodgingCost;
    const flightCostTotal = oneTrip.travelers * flightCost;
    const totalCost = dailyLodgingCost + flightCostTotal;
    return totalCost;
  }

  getCostOfTripsThisYear(destinationData) {
    const thisYearsTrips = this.tripDataOneUser.filter((trip) =>
      trip.date.includes("2022")
    );
    let result = destinationData.reduce((sum, currDestination) => {
      thisYearsTrips.forEach((trip) => {
        if (trip.destinationID === currDestination.id) {
          sum += trip.duration * currDestination.estimatedLodgingCostPerDay;
          sum += trip.travelers * currDestination.estimatedFlightCostPerPerson;
        }
      });
      return sum;
    }, 0);
    let agentFee = 1.1 * result;
    return Math.round(agentFee);
  }

  turnDatesToNumber() {
    let dateAsNumbers = this.tripDataOneUser.map((trip) => {
      let noSlashes = trip.date.split("/").join("");
      trip.date = parseInt(noSlashes);
      return trip;
    });
    this.tripDataNumberDates = dateAsNumbers;
    return dateAsNumbers;
  }

  sortedTrips() {
    this.turnDatesToNumber()
    let past = [];
    let pending = [];
    let future = [];
    return this.tripDataNumberDates.reduce((obj, currTrip) => {
      console.log(currTrip.date);
      if (currTrip.status === "pending") {
        pending.push(currTrip);
      } else if (currTrip.date > 20220304) {
        future.push(currTrip);
      } else if (currTrip.date < 20220304) {
        past.push(currTrip);
      }
      obj.past = past;
      obj.pending = pending;
      obj.future = future;
      return obj;
    }, {});
  }
}
export default Trips;
