let startDate, endDate, comicLimit; 

// const apiKey = 'd6cb2c40a70bfd62dd967ea72604c3a7';
const startURL = 'https://gateway.marvel.com/v1/public/comics?dateRange=';

const endUrl = '&ts=2019-11-19&apikey=d6cb2c40a70bfd62dd967ea72604c3a7&hash=2365d68ab95ef4c8e36e285198af89d5'



function buildUrl() {
    const fetchUrl = startURL + startDate + ',' + endDate + '&limit=' + comicLimit + endUrl;
    console.log(fetchUrl)
    return fetchUrl;
};


function getComics(){
    fetch(buildUrl())
    .then(response => {
        console.log(response);
        if(response.ok){
            return response.json();
        }else{
            // skips next .then and goes to .catch
            throw new Error();
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => handleErrors());
};

// Thanos on the variant cover of Infinity #4 (December 2013). Art by Jerome Opeña and Dustin Weaver.
function handleErrors() {
    $('.js-display').append(`<h2>Thanos Snapped your comics out of existence! Try another date range.</h2>
    <img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Thanos_Infinity_4.png" alt="Thanos the mad titan">`)
};

function displayResults(responseJson) {
    let item = responseJson.data.results;
    console.log('these are results', item);
    if(item.length === 0) {
        handleErrors();
    };
    for(let i = 0; i < item.length; i++){
        $('.js-display').append(`<h2>${item[i].title}</h2>
            <img src='${item[i].images[0].path}.${item[i].images[0].extension}'></img>
            <p>${item[i].description}</p>`);

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

function masterControl() {
    getDates();
};

$(masterControl);