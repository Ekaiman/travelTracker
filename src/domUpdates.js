const domUpdates = {
  updateTotalSpent(total) {
    let totalSpent = document.getElementById("totalSpent");
    totalSpent.innerText = "";
    totalSpent.innerText = ` Total Spent this Year: $${total}`;
  },

  displayAllTrips(allTrips, destinationData) {
    const pastTrips = document.getElementById("pastTrips");
    const pendingTrips = document.getElementById("pendingTrips");
    const futureTrips = document.getElementById("futureTrips");
    pastTrips.innerHTML = "<p>past trips</p>";
    pendingTrips.innerHTML = "<p>pending trips</p>";
    futureTrips.innerHTML = "<p>upcoming trips</p>";

    if (allTrips.pending.length === 0) {
      pendingTrips.innerHTML += `<div class="oneTrip square">
      <p id="destination"> You have no pending trips</p>
      </div>`;
    } else {
      allTrips.pending.forEach((trip) => {
        destinationData.forEach((destination) => {
          if (trip.destinationID === destination.id) {
            pendingTrips.innerHTML += `<div class="oneTrip square" id=${trip.id}>
          <p class="destination" id=${trip.id}>${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}" id=${trip.id}>
          </div>`;
          }
        });
      });
    }
    if (allTrips.past.length === 0) {
      pastTrips.innerHTML += `<div class="oneTrip square">
      <p id="destination"> You have no past trips</p>
      </div>`;
    } else {
    allTrips.past.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          pastTrips.innerHTML += `<div class="oneTrip square" id=${trip.id}>
          <p class="destination" id=${trip.id}>${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}" id=${trip.id}>
          </div>`;
        }
      });
    });
  }
  if (allTrips.future.length === 0) {
    futureTrips.innerHTML += `<div class="oneTrip square">
    <p id="destination"> You have no upcoming trips</p>
    </div>`;
  } else {
    allTrips.future.forEach((trip) => {
      destinationData.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          futureTrips.innerHTML += `<div class="oneTrip square" id=${trip.id}>
          <p class="destination" id=${trip.id}>${destination.destination}</p>
          <img src='${destination.image}' alt="${destination.alt}" id=${trip.id}>
          </div>`;
        }
      });
    });
  }
  },

  displayDropDownOptions(destinationData) {
    let dropDownDestinations = document.getElementById("dropDownDestinations");
    dropDownDestinations.innerHTML =
      '<option value="" disabled selected hidden>destinations</option>';
    destinationData.forEach((destination) => {
      dropDownDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`;
    });
  },

  displayEstimatedCost(total, agentFee) {
    let estimatedCost = document.getElementById("estimatedCost");
    estimatedCost.innerText = `You're estimated cost is ${total} plus an agent fee of ${agentFee} for a total of ${
      total + agentFee
    }`;
  },
  welcome(name) {
    const welcome = document.getElementById("welcome");
    welcome.innerText = `Welcome,           ${name}!`;
  },

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },

  goToMainPage() {
    const login = document.getElementById("login")
    const header = document.getElementById("header")
    const tripHolder = document.getElementById("tripHolder")
    domUpdates.hide(login)
    domUpdates.show(header)
    domUpdates.show(tripHolder)
  },

  invalidUsernameAndPassword(){
  wrongInputError.innerText = "Invalid username and password"
  },

  invalidUsername(){
    wrongInputError.innerText = "Invalid username"

  },

  invalidPassword(){
    wrongInputError.innerText = "Invalid password"

  },

  showSubmitButton(){
    const submitButton = document.getElementById("submitButton")
    domUpdates.show(submitButton)
  },

  hideSubmitButton(){
    const submitButton = document.getElementById("submitButton")
    domUpdates.hide(submitButton)
  },

  confirmTripSent(tripInfo, selectedLocation){
    let estimatedCost = document.getElementById("estimatedCost");
    estimatedCost.innerText = `Your ${tripInfo.duration} day trip to ${selectedLocation.destination} for ${tripInfo.travelers} people has been sent to the agency!`
    setTimeout(domUpdates.hideError, 8000)
  },

  hideError(){
    const errorTag = document.getElementById("errorTag")
    domUpdates.hide(errorTag)
  }
  
};

export default domUpdates;
