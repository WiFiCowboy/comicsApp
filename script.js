let startDate, endDate, comicLimit;

// const apiKey = 'd6cb2c40a70bfd62dd967ea72604c3a7';
const startURL = "https://gateway.marvel.com/v1/public/comics?dateRange=";

const endUrl =
  "&ts=2019-11-19&apikey=d6cb2c40a70bfd62dd967ea72604c3a7&hash=2365d68ab95ef4c8e36e285198af89d5";

function buildUrl() {
  const fetchUrl =
    startURL + startDate + "," + endDate + "&limit=" + comicLimit + endUrl;
  console.log(fetchUrl);
  return fetchUrl;
}

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

// Thanos on the variant cover of Infinity #4 (December 2013). Art by Jerome Opeña and Dustin Weaver.
function handleErrors() {
  $(".js-display")
    .append(`<h2>Thanos Snapped your comics out of existence! Try another date range.</h2>
    <img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Thanos_Infinity_4.png" alt="Thanos the mad titan">`);
}

// Artwork for the cover of The Amazing Spider-Man vol. 5, 11 (November 2018 Marvel Comics)  Art by Gabriele Dell'Otto
function comicError() {
  $(".js-display").append(`<h2>Doctor Doom has taken this comic!</h2>
    <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Doctor_Doom_%282018%29.jpg" alt="Doctor Doom">`);
}

function displayResults(responseJson) {
  let item = responseJson.data.results;
  console.log("these are results", item);
  if (item.length === 0) {
    handleErrors();
  }
  for (let i = 0; i < item.length; i++) {
    $(".js-display")
      .append(`<div class="comic-item" style= 'margin-left:25px; margin-right:25px; margin-top;25px; margin-bottom:25px;'>
            <img class='comic-cover' src='${item[i].images[0].path}.${
      item[i].images[0].extension
    } 'style = 'width: 300px; height: 400px; margin-left: 25px; margin-right: 100px; margin-bottom: 25px;'>
    <h2 style= 'margin-bottom: 10px;'>${item[i].title}</h2>
    </img>
            <p style= 'font-size: 20px;'>${
              item[i].description != null
                ? item[i].description
                : "This Comic is so awesome the description is classified!"
            }</p> </div>`);
  }
}

function getDates() {
  $("form").submit(function(event) {
    clearDisplayedComics();
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();
    formatDate(startDate);
    formatDate(endDate);
    event.preventDefault();
    maxComicLimit();
    getComics();
    console.log(startDate, endDate);
  });
}

function clearDisplayedComics() {
  $(".js-display").empty();
}

function formatDate(date) {
  // YYYY-MM-DD MM-DD-YYYY
  let month = date.slice(0, 2);
  let day = date.slice(3, 5);
  let year = date.slice(6, 10);
  let newDate = year + "-" + month + "-" + day;
  console.log(newDate);
}

function maxComicLimit() {
  comicLimit = $("#limit").val();
  console.log(comicLimit);
}

function masterControl() {
  getDates();
}

$(masterControl);
