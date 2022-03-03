import domUpdates from "./domUpdates";

// //FETCH calls

const fetchData = (url) => {
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error));
};

export default fetchData
