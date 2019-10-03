//Libraries
require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
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
};

// function for spotify-this-song command:
function spotifyThisSong(userInput) {
    if (userInput === "") {
        console.log("------------ WHOOPS ------------")
        console.log("You searched for nothing. Showing you 'The Sign' by Ace of Base, instead")
        userInput = "The Sign Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: userInput
    }).then(function(response, err) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        if (response.tracks.total === 0) {
            noSong();
        }
        else {
            console.log("------------ Spotify Song ------------");
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("--------------------------------------");
        }
    }).catch(function(error) {
        console.log(error);
        noSong();
        console.log("No Results Found. Showing you 'The Sign' by Ace of Base, instead");
    });
}

//function for when no song comes up in spotify-this-song command:
function noSong() {
    spotify.search({
         type: 'track',
          query: 'The Sign'
         }).then(function(response) {
            for (var i=0;i < response.tracks.items.length; i++) {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("------------ WHOOPS ------------")
                    console.log("No Results Found. Showing you 'The Sign' by Ace of Base, instead");
                    console.log("------------ Spotify Song ------------");
                    console.log("Artist: " + response.tracks.items[i].artists[0].name);
                    console.log("Track: " + response.tracks.items[i].name);
                    console.log("Preview URL: " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    i = response.tracks.items.length;
                    console.log("--------------------------------------");
                }
            }
        }).catch(function (error) {  
            console.log(error);
            console.log("No Results found.");
      });
};

//function for movie-this command:
function movieThis(userInput) {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("------------ Movie Result ------------");
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("Title: " + response.data.Title);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
                console.log("-------------------------------------");
            } 
            else {
                movieThis("Mr. Nobody");
            }
        }
    ).catch(function (error) {  
        console.log(error);
        console.log("No Results found. ");
  });
}