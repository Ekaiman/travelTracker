// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import domUpdates from "./domUpdates";
import {fetchData, postData} from "./apiCalls.js";
import UserRepository from "./UserRepository";
import User from "./User";
import Trips from "./Trips";
import Destination from "./Destinations";
import './css/base.scss';

const submitButton = document.getElementById("submitButton")
const dateInput = document.getElementById("dateInput")
const durationInput = document.getElementById("durationInput")
const travelersInput = document.getElementById("travelersInput")
const dropDownDestinations = document.getElementById("dropDownDestinations")
const inputForm = document.getElementById("inputForm")
// An example of how you tell webpack to use a CSS (SCSS) file
let tripInst;
let total;
let travelersData
let tripsData
let destinationData
let selectedLocation
let tripInfo
let tripId

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');
const newInstanceTrip = (id, tripData) => {
  tripInst = new Trips(id, tripData)
}

const getTripInformation = () => {
  getDestinationId(destinationData, dropDownDestinations.value)
  let date = dateInput.value
  let dateFixed = date.replaceAll('-', '/')
  let duration = parseInt(durationInput.value)
  let travelers = parseInt(travelersInput.value)
    tripId = tripsData.length + 1
  console.log('TRIPID', tripId)
  console.log(tripId, 'THIS IS TRUPID')
  console.log('ID', selectedLocation.id)
  console.log('TRAVELERS', travelers)
  console.log('DATA', dateFixed)
  console.log('DURATION', duration)
  tripInfo = {dateFixed, travelers, duration, tripId}
  createPost()
}

const createPost = () => {
  postData(selectedLocation, tripInfo)
  .then(fetchAllData)
  .catch(error => console.log(error))
  console.log('AFTER POST', tripsData)
}



const getDestinationId = (datas, place) => {
   selectedLocation = datas.find(data => data.destination === place)

  return selectedLocation
}

let fetchAllData = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
  ]).then(data => {
    travelersData = data[0].travelers
    tripsData = data[1].trips
    destinationData = data[2].destinations
    newInstanceTrip(44, tripsData)
    total = tripInst.getCostOfTripsThisYear(destinationData)
    domUpdates.updateTotalSpent(total)
    let allTrips = tripInst.sortedTrips()
    domUpdates.displayAllTrips(allTrips, destinationData)
    domUpdates.displayDropDownOptions(destinationData)
    console.log(tripsData)
  })
};


const loadPage = () => {
  fetchAllData();
};

submitButton.addEventListener('click', getTripInformation)


window.onload = loadPage;
