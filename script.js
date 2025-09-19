//http://api.weatherapi.com/v1/current.json?key=7b18880c411f490f9a471821251609&q=Indore&aqi=no

const tempratureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location .location");
const dateandTimeField = document.querySelector(".time_location .time");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "lucknow";

const fetchResults = async (targetLocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=7b18880c411f490f9a471821251609&q=${targetLocation}&aqi=no`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;

  updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];
  let dayNumber = new Date(splitDate).getDay();
  let currentDay = getDayName(dayNumber);

  tempratureField.innerText = temp + "°C";
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${splitTime} ${currentDay} ${splitDate}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
