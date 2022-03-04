const domUpdates = {
  updateTotalSpent(total) {
    let totalSpent = document.getElementById("totalSpent");
    totalSpent.innerText = ''
    totalSpent.innerText = ` Total Spent this Year: $${total}`;
  },

  displayAllTrips(allTrips, destinationData) {
    const pastTrips = document.getElementById("pastTrips")
    const pendingTrips = document.getElementById("pendingTrips")
    const futureTrips = document.getElementById("futureTrips")
    pastTrips.innerHTML = ''
    pendingTrips.innerHTML = ''
    futureTrips.innerHTML = ''
    allTrips.pending.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          pendingTrips.innerHTML += `<div class="oneTrip square">
          <p id="destinatio">${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}">
          </div>`;
        }
      });
    });
    allTrips.past.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          pastTrips.innerHTML += `<div class="oneTrip square">
          <p id="destinatio">${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}">
          </div>`;
        }
      });
    });
    allTrips.future.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          futureTrips.innerHTML += `<div class="oneTrip square">
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
