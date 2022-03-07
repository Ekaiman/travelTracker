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
    welcome.innerText = `Welcome , ${name}!`;
  },

  hide(element) {
    element.classList.add("hidden");
  },

  show(element) {
    element.classList.remove("hidden");
  },

  // viewOneTrip(tripData, destinationData, allTripsSorted) {
  //   let clickedTripId;
  //   let trips = tripData;
  //   let destination = destinationData;
  //   let sorted = allTripsSorted
  //   let oneTrips = document.querySelectorAll(".oneTrip");
  //   const pastTrips = document.getElementById("pastTrips");
  //   const pendingTrips = document.getElementById("pendingTrips");
  //   const futureTrips = document.getElementById("futureTrips");
  //   console.log(event.target.id);
  //   oneTrips.forEach((trip) => {
  //     if (
  //       trip.id === event.target.id &&
  //       event.target.id !== "tripHolder" &&
  //       event.target.id !== "" &&
  //       event.target.id !== "pastTrips" &&
  //       event.target.id !== "pendingTrips" &&
  //       event.target.id !== "futureTrips" &&
  //       event.target.id !== "allTripsWrapper"
  //     ) {
  //       clickedTripId = trip.id;
  //       domUpdates.hide(pendingTrips);
  //       domUpdates.hide(pastTrips);
  //       domUpdates.hide(futureTrips);
  //       domUpdates.showTripDetails(trips, destination, clickedTripId);
  //     } else if (trip.id === "viewAllTrips"){
  //       domUpdates.show(pendingTrips);
  //       domUpdates.show(pastTrips);
  //       domUpdates.show(futureTrips);
  //       domUpdates.displayAllTrips(sorted, destinationData)
  //     }
  //   });
  // },
  //
  // showTripDetails(tripData, destinationData, clickedTripId) {
  //   let number = parseInt(clickedTripId);
  //   const allTripsWrapper = document.getElementById("allTripsWrapper");
  //   let oneTrip = tripData.find((trip) => trip.id === number);
  //   let date = oneTrip.date.toString().split("");
  //   let year = [];
  //   let month = [];
  //   let day = [];
  //   date.forEach((number, index) => {
  //     if (index <= 3) {
  //       year.push(number);
  //     } else if (index <= 5) {
  //       month.push(number);
  //     } else {
  //       day.push(number);
  //     }
  //   });
  //   let yearS = year.join("");
  //   let monthS = month.join("");
  //   let dayS = day.join("");
  //   let dateForUser = `${monthS}/${dayS}/${yearS}`;
  //   console.log(dateForUser);
  //   destinationData.forEach((destination) => {
  //     if (oneTrip.destinationID === destination.id) {
  //       console.log("something");
  //       allTripsWrapper.innerHTML = `
  //       <div class="square oneTrip oneClickedTrip" id=${oneTrip.id}>
  //         <!-- <div class="location-picture"> -->
  //         <p class="destination" id=${oneTrip.id}>${destination.destination}</p>
  //           <!-- <img src='${destination.image}' alt="${destination.alt}" class="expanedCardImg"/> -->
  //         <!-- <p>Total Spent: </p> -->
  //         <p>Date of Trip: ${dateForUser}</p>
  //         <p>Length of Trip: ${oneTrip.duration}</p>
  //         <p>Travelers: ${oneTrip.travelers}</p>
  //         <!-- </div> -->
  //         <button type="button" name="button" id="viewAllTrips">
  //           View All Trips
  //         </button>
  //       </div>`;
  //     }
  //   });
  // },
};

export default domUpdates;
