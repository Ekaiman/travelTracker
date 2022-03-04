const domUpdates = {
  updateTotalSpent(total) {
    let totalSpent = document.getElementById("totalSpent");
    totalSpent.innerText = ''
    totalSpent.innerText = ` Total Spent this Year: $${total}`;
  },

  displayAllTrips(allTrips, destinationData) {
    let allTripsWrapper = document.getElementById("allTripsWrapper");
    allTripsWrapper.innerHTML = ''
    allTrips.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          allTripsWrapper.innerHTML += `<div class="oneTrip square">
          <p id="destinatio">${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}">
          </div>`;
        }
      });
    });
  },

  displayDropDownOptions(destinationData) {
    let dropDownDestinations = document.getElementById("dropDownDestinations");
    destinationData.forEach(destination => {
      dropDownDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`;
    });
  },
};

export default domUpdates;
