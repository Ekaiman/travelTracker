// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import domUpdates from "./domUpdates";
import {fetchData, postData} from "./apiCalls.js";
import UserRepository from "./UserRepository";
import User from "./User";
import Trips from "./Trips";
import Destination from "./Destinations";
import './css/base.scss';

const calculateButton = document.getElementById("calculateButton")
const submitButton = document.getElementById("submitButton")
const dateInput = document.getElementById("dateInput")
const durationInput = document.getElementById("durationInput")
const travelersInput = document.getElementById("travelersInput")
const dropDownDestinations = document.getElementById("dropDownDestinations")
const inputForm = document.getElementById("inputForm")
const tripHolder = document.getElementById("tripHolder")
const viewAllTrips = document.getElementById("viewAllTrips")
// An example of how you tell webpack to use a CSS (SCSS) file
let tripInst, destinationInst, userInst, oneUser
let travelersData, tripsData, destinationData
let selectedLocation
let total;
let allTripsSorted;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import "./images/protruding-squares.svg"
import "./images/luggage.jpg"
import "./images/tickets.jpg"


// console.log('This is the JavaScript entry file - your code begins here.');
const newInstanceTrip = (id, tripData) => {
  tripInst = new Trips(id, tripData)
}

const newInstanceDestination = (destinationData) => {
  destinationInst = new Destination(destinationData)
}

const newInstanceUser = (data) => {
  userInst = new User(data)
}





const getTripInformationForPost = () => {
  // if(dateInput.vale && durationInput.value && travelersInput.value && dropDownDestinations.value){
  let date = dateInput.value
  let dateFixed = date.replaceAll('-', '/')
  let duration = parseInt(durationInput.value)
  let travelers = parseInt(travelersInput.value)
  let tripId = tripsData.length + 1
  let tripInfo = {dateFixed, travelers, duration, tripId}
  createPost(tripInfo)}
// }

const getDestinationId = (place) => {
  selectedLocation = destinationInst.getDestinationByName(dropDownDestinations.value)
  return selectedLocation
}

const createPost = (tripInfo) => {
  fetchAllData()
  postData(selectedLocation, tripInfo)
  .then(fetchAllData)
  .catch(error => console.log(error))
}


const calculateTripCost = () => {
  getDestinationId(dropDownDestinations.value)
  let cost = tripInst.getCostOfPendingTrip(durationInput.value, travelersInput.value, selectedLocation.id, destinationData)
  domUpdates.displayEstimatedCost(cost.total, cost.agentFee)
}

let fetchAllData = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
    fetchData("http://localhost:3001/api/v1/travelers/44"),
  ]).then(data => {
    createData(data[0], data[1], data[2], data[3])
    console.log(oneUser)
    newInstanceTrip(44, tripsData)
    newInstanceDestination(destinationData)
    newInstanceUser(oneUser)
    total = tripInst.getCostOfTripsThisYear(destinationData)
    updateDom()
  })
};

const updateDom = () => {
  let name = userInst.getFirstName()
  allTripsSorted = tripInst.sortedTrips()
  domUpdates.welcome(name)
  domUpdates.updateTotalSpent(total)
  domUpdates.displayAllTrips(allTripsSorted, destinationData)
  domUpdates.displayDropDownOptions(destinationData)
}

const createData = (travelers, trips, destination, user) => {
  travelersData = travelers.travelers
  tripsData = trips.trips
  destinationData = destination.destinations
  oneUser = user
}


const loadPage = () => {
  fetchAllData();
};

submitButton.addEventListener('click', getTripInformationForPost)

calculateButton.addEventListener('click', calculateTripCost)

// tripHolder.addEventListener('click', function() {
//   domUpdates.displayAllTrips(allTripsSorted, destinationData)
// });

// tripHolder.addEventListener('click', function() {
//   domUpdates.viewOneTrip(tripsData, destinationData)
// });

window.onload = loadPage;
