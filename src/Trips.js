class Trips{
  constructor(id, tripData){
    this.tripData = tripData
    this.tripDataOneUser = tripData.filter(trip => trip.userID === id)
  }

  returnDestinationId(){
    return this.tripDataOneUser.map(trip => trip.destinationID)
  }

  getCostOfOneTrip(id, lodgingCostPerDay, flightCostPerPerson){
    const oneTrip = this.tripDataOneUser.find(trip => trip.id === id)
    const dailyLodgingCost = oneTrip.duration * lodgingCostPerDay
    const flightCost = oneTrip.travelers * flightCostPerPerson
    const totalCost = dailyLodgingCost + flightCost
    return totalCost
  }

  getCostOfTripsThisYear() {

  }

  getCostOfAllTrips(){
    
  }
}
export default Trips
