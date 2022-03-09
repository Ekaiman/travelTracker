import domUpdates from "./domUpdates";


const fetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const postData = (selectedLocationObj, getTripInformation, userId) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
      id: Date.now(),
      userID: userId,
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
  if (response.status == 422){
    errorTag.innerText = "Oops, we didnt get that. Please try again."
    setTimeout(domUpdates.hideError, 2000)
  } else if (!response.ok){
    throw new Error(respose)
    throw `${response.status} ${response.statusText}`
  } else {
    return response.json()
  }
}

export { fetchData, postData };
