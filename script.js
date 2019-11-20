let states = '';
// new
const apiKey = 'd6cb2c40a70bfd62dd967ea72604c3a7';
const searchURL = 'https://gateway.marvel.com/v1/public/comics?startYear=';
const limit = 'limit='
// end new
const queryParam = '?stateCode=';
let maxResults = '';

// The user must be able to search for parks in one or more states.
function getStates(){
    $('.userRequest').submit(event => {
        event.preventDefault();
        states = $('#states').val().toLowerCase();
        console.log(states);
        grabMaxResults();
        getUserParks();
        clearTextInput()
    });
};

function buildUrl(){
    const fetchUrl = searchURL + queryParam + states + '&api_key=' + apiKey + '&limit=' + maxResults;
    console.log(fetchUrl)
    return fetchUrl;
}

function clearTextInput() {
    $('#states').val('');
}

// The user must be able to set the max number of results, with a default of 10.
function grabMaxResults() {
    maxResults = $('#returnResults').val();
}

// The search must trigger a call to NPS's API.
function getUserParks(){
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
    .catch(error => errorHandle());
};

// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
function displayResults(responseJson){
    $('.displayParkInfo').empty();
    if(responseJson.data.length === 0){
        errorHandle();
    }
    for(let i = 0; i < responseJson.data.length; i++){
        $('.displayParkInfo').append(
            `<h2>Park Name: ${responseJson.data[i].fullName} State:${responseJson.data[i].states}</h2>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>`)
    }
    $('.displayParkInfo').removeClass('hidden');
};

function errorHandle() {
    $('.displayParkInfo').append(`<h3>States not found!</h3>`);
    $('.displayParkInfo').removeClass('hidden');
};

function masterControl(){
    console.log('Script connected');
    getStates();

};

$(masterControl);