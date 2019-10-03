//Libraries
require('dotenv').config();
var keys = require('./keys.js');
var spotify = new spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var fs = require('fs');
var moment = require('moment');
//Variables that capture user input.
var command = process.argv[2];
var userInput = process.argv[3];

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

