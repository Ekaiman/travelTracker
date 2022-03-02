class Trips{
  constructor(id, tripData){
    this.tripData = tripData
    this.tripDataOneUser = tripData.filter(trip => trip.userID === id)
  }

  returnDestinationId(){
    return this.tripDataOneUser.map(trip => trip.destinationID)
  }

  getCostOfOneTrip(id, lodgingCost, flightCost){
    const oneTrip = this.tripDataOneUser.find(trip => trip.id === id)
    const dailyLodgingCost = oneTrip.duration * lodgingCost
    const flightCostTotal = oneTrip.travelers * flightCost
    const totalCost = dailyLodgingCost + flightCostTotal
    return totalCost
  }

  getCostOfTripsThisYear(destinationData) {
    const thisYearsTrips = this.tripDataOneUser.filter(trip => trip.date.includes('2022'))
    let result = destinationData.reduce((sum, currDestination) => {
      thisYearsTrips.forEach(trip => {
        if (trip.destinationID === currDestination.id){
          sum += (trip.duration * currDestination.estimatedLodgingCostPerDay)
          sum += (trip.travelers * currDestination.estimatedFlightCostPerPerson)
        }
      })
      return sum
    }, 0)
    let agentFee = 1.1 * result
    return Math.round(agentFee)
  }


}
export default Trips
