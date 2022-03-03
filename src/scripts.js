// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import domUpdates from "./domUpdates";
import fetchData from "./apiCalls.js";
import UserRepository from "./UserRepository";
import User from "./User";
import Trips from "./Trips";
import Destination from "./Destinations";

let totalSpent = document.getElementById('totalSpent')
// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';
let tripInst;
let total;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
const newInstanceTrip = (id, tripData) => {
  tripInst = new Trips(id, tripData)
}

let fetchAllData = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
  ]).then(data => {
    const travelersData = data[0].travelers
    const tripsData = data[1].trips
    const destinationData = data[2].destinations
    newInstanceTrip(19, tripsData)
    total = tripInst.getCostOfTripsThisYear(destinationData)
    domUpdates.updateTotalSpent(total)
    let allTrips = tripInst.tripDataOneUser
    console.log(allTrips)
    domUpdates.displayAllTrips(allTrips, destinationData)
    domUpdates.displayDropDownOptions(destinationData)
  })
};


const loadPage = () => {
  fetchAllData();
};

window.onload = loadPage;
