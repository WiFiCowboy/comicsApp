<<<<<<< HEAD
let startDate = "";
let endDate = "";
// new
// const apiKey = 'd6cb2c40a70bfd62dd967ea72604c3a7';
const startURL = "https://gateway.marvel.com/v1/public/comics?dateRange=";
=======
let startDate, endDate, comicLimit; 

// const apiKey = 'd6cb2c40a70bfd62dd967ea72604c3a7';
const startURL = 'https://gateway.marvel.com/v1/public/comics?dateRange=';

const endUrl = '&ts=2019-11-19&apikey=d6cb2c40a70bfd62dd967ea72604c3a7&hash=2365d68ab95ef4c8e36e285198af89d5'

>>>>>>> fedbb99399bb6aa7826cd75ca00649c1c86903b2

const endUrl =
  "&limit=20&ts=2019-11-19&apikey=d6cb2c40a70bfd62dd967ea72604c3a7&hash=2365d68ab95ef4c8e36e285198af89d5";

function buildUrl() {
<<<<<<< HEAD
  const fetchUrl = startURL + startDate + "," + endDate + endUrl;
  console.log(fetchUrl);
  return fetchUrl;
}
=======
    const fetchUrl = startURL + startDate + ',' + endDate + '&limit=' + comicLimit + endUrl;
    console.log(fetchUrl)
    return fetchUrl;
};
>>>>>>> fedbb99399bb6aa7826cd75ca00649c1c86903b2

// The search must trigger a call to NPS's API.
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
    .catch(error => console.log("error thrown", error));
}

function displayResults(responseJson) {
  let item = responseJson.data.results;
  console.log("these are results", item);
  for (let i = 0; i < item.length; i++) {
    $(".js-display").append(`<h2>${item[i].title}</h2>
            <img src='${item[i].images[0].path}.${item[i].images[0].extension}'></img>
            <p>${item[i].description}</p>`);
<<<<<<< HEAD
  }
}

function getDates() {
  $("form").submit(function(event) {
    clearDisplayedComics();
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();
    event.preventDefault();
    getComics();
    console.log(startDate, endDate);
  });
}

function clearDisplayedComics() {
  $(".js-display").empty();
}

=======

    };
};

function getDates() {
    $('form').submit(function(event) {
        clearDisplayedComics();
        startDate = $('#startDate').val();
        endDate = $('#endDate').val();
        event.preventDefault();
        maxComicLimit();
        getComics();
        console.log(startDate, endDate);
    });
};

function clearDisplayedComics(){
    $('.js-display').empty();
};

function maxComicLimit() {
    comicLimit = $('#limit').val();
    console.log(comicLimit);
};

>>>>>>> fedbb99399bb6aa7826cd75ca00649c1c86903b2
function masterControl() {
  getDates();
}

$(masterControl);
