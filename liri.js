//Libraries
require('dotenv').config();
var keys = require('./keys.js');
// var spotify = new spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var fs = require('fs');
var moment = require('moment');
var axios = require('axios');
//Variables that capture user input.
var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//Switch/case for your functions
switch (command) {
    case 'concert-this':
        concertThis(userInput);
        break;
    case 'spotify-this-song':
        spotifyThisSong(userInput);
        break;
    case 'movie-this':
        movieThis(userInput);
        break;
    case 'do-what-it-says':
        doSomething();
        break;
    default:
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
};

//fucntion for concert-this command:
function concertThis(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            if(response.data[0].venue !=  undefined) {
                console.log("------------ Event Info ------------");
                console.log("Band/Artist: " + response.data[0].lineup);
                console.log("Event Veunue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
                console.log("------------------------------------");
            }
            else {
                console.log("------------ Event Info ------------");
                console.log("Band/Artist: " + userInput)
                console.log("No results found. Please make sure the band/artist name is spelled correctly");
                console.log("------------------------------------");
            }
        }
    ).catch(function (error) {
        console.log (error);
  });
}