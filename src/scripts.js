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
const username = document.getElementById("username")
const pass = document.getElementById("pass")
const signInButton = document.getElementById("signInButton")
const wrongInputError = document.getElementById("wrongInputError")
const errorTag = document.getElementById("errorTag")
// An example of how you tell webpack to use a CSS (SCSS) file
let tripInst, destinationInst, userInst, oneUser
let travelersData, tripsData, destinationData
let selectedLocation
let total;
let allTripsSorted;
let userId

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
  let date = dateInput.value
  let dateFixed = date.replaceAll('-', '/')
  let duration = parseInt(durationInput.value)
  let travelers = parseInt(travelersInput.value)
  let tripId = tripsData.length + 1
  let tripInfo = {dateFixed, travelers, duration, tripId}
  createPost(tripInfo)
}

const getDestinationId = (place) => {
  selectedLocation = destinationInst.getDestinationByName(dropDownDestinations.value)
  return selectedLocation
}

const createPost = (tripInfo) => {

  postData(selectedLocation, tripInfo, userId)
  .then(() => fetchAllData(), domUpdates.hideSubmitButton(), domUpdates.confirmTripSent(tripInfo, selectedLocation))
  .catch((error) => {
        console.log(error.status)
        if (error.message === "Failed to fetch") {
          return errorTag.innerText = "OOPS SORRY something went wrong"
        } else {
        return errorTag.innerText = error.message
      }
      });
}




const calculateTripCost = () => {
  getDestinationId(dropDownDestinations.value)
  let cost = tripInst.getCostOfPendingTrip(durationInput.value, travelersInput.value, selectedLocation.id, destinationData)

  if (durationInput.value > 0 && travelersInput.value > 0 && selectedLocation.id && destinationData){
  domUpdates.displayEstimatedCost(cost.total, cost.agentFee)
  domUpdates.showSubmitButton()
}
}

let fetchAllData = () => {
  Promise.all([
    fetchData("http://localhost:3001/api/v1/travelers"),
    fetchData("http://localhost:3001/api/v1/trips"),
    fetchData("http://localhost:3001/api/v1/destinations"),
    fetchData(`http://localhost:3001/api/v1/travelers/${userId}`),
  ]).then(data => {
    createData(data[0], data[1], data[2], data[3])
    newInstanceTrip(userId, tripsData)
    newInstanceDestination(destinationData)
    newInstanceUser(oneUser)
    total = tripInst.getCostOfTripsThisYear(destinationData)
    updateDom()
  })
  .catch((error) => {
        console.log(error)
        if (error.message === "Failed to fetch") {
          return errorTag.innerText = "OOPS SORRY something went wrong"
        } else {
          return errorTag.innerText = error.message
        }
      });
};

const updateDom = () => {
  let name = userInst.getFirstName()
  allTripsSorted = tripInst.sortedTrips()
  domUpdates.goToMainPage()
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

const evaluateInformation = () => {
  let userIdInput = username.value.split("r")[2]
  userId = parseInt(userIdInput)
  let userTraveler = username.value.slice(0,8)
  let passwordInput = pass.value

  if(userTraveler === "traveler" && passwordInput === "travel" && userId <= 50 && userId){
    loadPage()
  } else if (userTraveler !== "traveler" && passwordInput !== "travel"){
    domUpdates.invalidUsernameAndPassword()
  } else if (userTraveler !== "traveler" || userId > 50 || !userId){
    domUpdates.invalidUsername()
  } else if (passwordInput !== "travel") {
    domUpdates.invalidPassword()
  }
}



submitButton.addEventListener('click', getTripInformationForPost)
calculateButton.addEventListener('click', calculateTripCost)
signInButton.addEventListener('click', evaluateInformation)
