let startDate, endDate, comicLimit;

const startURL = "https://gateway.marvel.com/v1/public/comics?dateRange=";

const endUrl =
  "&ts=2019-11-19&apikey=d6cb2c40a70bfd62dd967ea72604c3a7&hash=2365d68ab95ef4c8e36e285198af89d5";

// Concatenate URL to a single function call  
function buildUrl() {
  const fetchUrl =
    startURL + startDate + "," + endDate + "&limit=" + comicLimit + endUrl;
  console.log(fetchUrl);
  return fetchUrl;
}

// Calls API 
function getComics() {
  fetch(buildUrl())
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        // skips next .then and goes to .catch
        throw new Error();
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => comicError());
}

// Error message for JSON returning empty
// Thanos on the variant cover of Infinity #4 (December 2013). Art by Jerome Opeña and Dustin Weaver.
function handleErrors() {
  $(".js-display").append(`<div class="comic-item">
    <img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Thanos_Infinity_4.png" alt="Thanos the mad titan"> 
    <h2>Thanos Snapped your comics out of existence! Try another date range.</h2> 
    </div>`);
}

// Error message for error inside JSON Array 
// Artwork for the cover of The Amazing Spider-Man vol. 5, 11 (November 2018 Marvel Comics)  Art by Gabriele Dell'Otto
function comicError() {
  $(".js-display").append(`<div class="comic-item">
    <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Doctor_Doom_%282018%29.jpg" alt="Doctor Doom">
    <h2>Doctor Doom has taken this comic!</h2>
    </div>`);
}

// renders results from API request
function displayResults(responseJson) {
  let item = responseJson.data.results;
  console.log("these are results", item);
  if (item.length === 0) {
    handleErrors();
  }
  for (let i = 0; i < item.length; i++) {
    $(".js-display")
    // end test
      .append(`<div class="comic-item">
            <img class='comic-cover' src='${item[i].images[0].path}.${
      item[i].images[0].extension
    }'></img>
    <h2>${item[i].title}</h2>
            <p>${
              item[i].description != null
                ? item[i].description
                : "This Comic is so awesome the description is classified!"
            }</p>
     </div>`);
  }
}

// gets start and end dates from form
function getDates() {
  $("form").submit(function(event) {
    clearDisplayedComics();
    startDate = formatDate($("#startDate").val());
    endDate = formatDate($("#endDate").val());
    event.preventDefault();
    maxComicLimit();
    getComics();
    console.log(startDate, endDate);
  });
}

// clears display DIV
function clearDisplayedComics() {
  $(".js-display").empty();
}


function formatDate(date) {
  // YYYY-MM-DD MM-DD-YYYY
  let month = date.slice(0, 2);
  let day = date.slice(3, 5);
  let year = date.slice(6, 10);
  let newDate = year + "-" + month + "-" + day;
  return newDate;
}


function maxComicLimit() {
  comicLimit = $("#limit").val();
  console.log(comicLimit);
}

// runs script on page load 
function masterControl() {
  getDates();
}

$(masterControl);
