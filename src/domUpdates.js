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

  displayEstimatedCost(total, agentFee) {
    let estimatedCost = document.getElementById("estimatedCost")
    estimatedCost.innerText = `You're estimated cost is ${total} plus an agent fee of ${agentFee} for a total of ${total + agentFee}`
  }
};

export default domUpdates;
