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
// An example of how you tell webpack to use a CSS (SCSS) file
let tripInst, destinationInst, userInst, oneUser
let travelersData
let tripsData
let destinationData
let selectedLocation
let tripInfo
let tripId
let total;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

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

const getTripInformation = () => {
  getDestinationId(destinationData, dropDownDestinations.value)
  let date = dateInput.value
  let dateFixed = date.replaceAll('-', '/')
  let duration = parseInt(durationInput.value)
  let travelers = parseInt(travelersInput.value)
    tripId = tripsData.length + 1
    console.log(dropDownDestinations.value, 'DESTINATION SELECTION')
  tripInfo = {dateFixed, travelers, duration, tripId}
  createPost()
}

const createPost = () => {
  fetchAllData()
  postData(selectedLocation, tripInfo)
  .then(fetchAllData)
  .catch(error => console.log(error))

}



const getDestinationId = (datas, place) => {
   selectedLocation = datas.find(data => data.destination === place)

  return selectedLocation
}

const calculateTripCost = () => {
  let selectedDestination = destinationInst.getDestinationByName(dropDownDestinations.value)
  let cost = tripInst.getCostOfPendingTrip(durationInput.value, travelersInput.value, selectedDestination.id, destinationData)
  domUpdates.displayEstimatedCost(cost.total, cost.agentFee)
}

let fetchAllData = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
    fetchData("http://localhost:3001/api/v1/travelers/44"),
  ]).then(data => {
    travelersData = data[0].travelers
    tripsData = data[1].trips
    destinationData = data[2].destinations
    oneUser = data[3]
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
  let allTrips = tripInst.sortedTrips()
  // let total = tripInst.getCostOfTripsThisYear(destinationData)
  domUpdates.welcome(name)
  domUpdates.updateTotalSpent(total)
  domUpdates.displayAllTrips(allTrips, destinationData)
  domUpdates.displayDropDownOptions(destinationData)
}


const loadPage = () => {
  fetchAllData();
};

submitButton.addEventListener('click', getTripInformation)
calculateButton.addEventListener('click', calculateTripCost)


window.onload = loadPage;
