require("dotenv").config();

var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var fs = require("fs");