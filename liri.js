//read and set enviornment variables
require("dotenv").config();

//VARIABLES
var axios = require("axios");
var keys = require("./keys.js");
var spotifySearch = require("node-spotify-api");
var moment = require("moment");
var spotify = new spotify(keys.spotify);
var fs = require("fs");
// variables that capture user input
var liriFunction = process.argv[2];
var userInput = process.argv[3];


