import domUpdates from "./domUpdates";

// //FETCH calls

const fetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const postData = (selectedLocationObj, getTripInformation) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: getTripInformation.tripId,
      userID: 44,
      destinationID: selectedLocationObj.id,
      travelers: getTripInformation.travelers,
      date: getTripInformation.dateFixed,
      duration: getTripInformation.duration,
      status: "pending",
      suggestedActivities: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => checkOk(response))
};

const checkOk = (response) => {
  if (!response.ok){
    // throw new Error(respose)
    throw `${response.status} ${response.statusText}`
  } else {
    response.json()
  }
}

export { fetchData, postData };
