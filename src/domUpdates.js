const domUpdates = {
  updateTotalSpent(total) {
    let totalSpent = document.getElementById("totalSpent");
    totalSpent.innerText += ` $${total}`;
    console.log(total);
    console.log("dom update");
  },

  displayAllTrips(allTrips, destinationData) {
    let allTripsWrapper = document.getElementById("allTripsWrapper");
    allTrips.forEach((trip) => {
      destinationData.forEach((destination) => {

        if(trip.destinationID === destination.id){

          console.log(trip.destinationID, 'ID')
          allTripsWrapper.innerHTML += `<div class="oneTrip">
          <p id="destinatio">${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}">
          </div>`;
        }
      });
    });
  },

  displayDropDownOptions(destinationData){
    let dropDownDestinations = document.getElementById("dropDownDestinations")
    destinationData.forEach(destination => {
      dropDownDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
    })
  }
};

export default domUpdates;
