require("dotenv").config();

var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var fs = require("fs");

axios.all([
    axios.get("http://www.omdbapi.com"),
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
])