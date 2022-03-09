class Trips {
  constructor(id, tripData) {
    this.tripData = tripData;
    this.tripDataOneUser = tripData.filter((trip) => trip.userID === id);
    this.tripDataNumberDates;
    this.todaysDate;
  }

  returnDestinationId() {
    return this.tripDataOneUser.map((trip) => trip.destinationID);
  }

  getCostOfOneTrip(tripId, lodgingCost, flightCost) {
    const oneTrip = this.tripDataOneUser.find((trip) => trip.id === tripId );
    const dailyLodgingCost = oneTrip.duration * lodgingCost;
    const flightCostTotal = oneTrip.travelers * flightCost;
    const totalCost = dailyLodgingCost + flightCostTotal;
    return totalCost;
  }

  getCostOfTripsThisYear(destinationData) {
    const thisYearsTrips = this.tripDataOneUser.filter((trip) =>{
      if (trip.date.includes("2022")){
        return trip
      }
    }
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
    this.turnDatesToNumber();
    this.getTodaysDate()
    let past = [];
    let pending = [];
    let future = [];
    return this.tripDataNumberDates.reduce((obj, currTrip) => {
      if (currTrip.status === "pending") {
        pending.push(currTrip);
      } else if (currTrip.date > this.todaysDate) {
        future.push(currTrip);
      } else if (currTrip.date < this.todaysDate) {
        past.push(currTrip);
      }
      obj.past = past;
      obj.pending = pending;
      obj.future = future;
      return obj;
    }, {});
  }

  getTodaysDate() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    this.todaysDate = parseInt(yyyy + mm  + dd);

  }

  getCostOfPendingTrip(days, travelers, destinationID, destinationData){
    let place = destinationData.find(destination => destination.id === destinationID)
    let dailyCost = place.estimatedLodgingCostPerDay * days
    let flightCost = place.estimatedFlightCostPerPerson * travelers
    let total = dailyCost + flightCost
    let agentFee = Math.round((dailyCost + flightCost) * .1)
    return {total, agentFee}
  }
}
export default Trips;
