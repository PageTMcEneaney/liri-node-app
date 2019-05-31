require("dotenv").config();

var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require('fs');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var control = process.argv[2];
var whatItSays = 0;

var concert = function (whatItSays) {
    var artist = "Elton John"

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=2019-01-01%2C2020-01-01";

    if (process.argv[3]) {
        artist = process.argv[3];
    } else if (whatItSays !== "") {
        artist = whatItSays;
    }

    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=2019-01-01%2C2020-01-01";

    axios.get(queryUrl).then(
        function (response) {
            for (var i = 0; i < 5; i++) {
                console.log("You searched: " + artist);
                console.log("---------------Lineup---------------");
                console.log(response.data[i].lineup);
                console.log("---------------Venue Name---------------");
                console.log(response.data[i].venue.name);
                console.log("---------------Venu Location---------------");
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                console.log("---------------Date of Event---------------");
                console.log(moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                console.log();

            }

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
var spotifySong = function (whatItSays) {
    var song = "The Sign Ace of Base"

    if (process.argv[3]) {
        song = process.argv[3];
    } else if (whatItSays !== "") {
        song = whatItSays;
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("You searched: " + song);
        console.log("---------------Artist---------------");
        console.log(data.tracks.items[0].album.artists[0].name);
        console.log("---------------Song---------------");
        console.log(data.tracks.items[0].name);
        console.log("---------------Album---------------");
        console.log(data.tracks.items[0].album.name);
        console.log("---------------Link---------------");
        console.log(data.tracks.items[0].href);

    });
}
var movie = function (whatItSays) {
    var movie = "Mr. Nobody";

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    if (process.argv[3]) {
        movie = process.argv[3];
    } else if (whatItSays !== "") {
        movie = whatItSays;
    }

    queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


    axios.get(queryUrl).then(
        function (response) {

            console.log("You searched: " + movie);
            console.log(movie + " was made in: " + response.data.Year);
            console.log("---------------Title---------------");
            console.log(response.data.Title);
            console.log("---------------Year---------------");
            console.log(response.data.Year);
            console.log("---------------IMDB Rating---------------");
            console.log(response.data.Ratings[0].Value);
            console.log("---------------Rotten Tomatoes Rating---------------");
            console.log(response.data.Ratings[1].Value);
            console.log("---------------Production Country---------------");
            console.log(response.data.Country);
            console.log("---------------Languages---------------");
            console.log(response.data.Language);
            console.log("---------------Plot---------------");
            console.log(response.data.Plot);
            console.log("---------------Actors---------------");
            console.log(response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });


}
var filesystem = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var split = data.split(",");
        var noQuotes = split[1].split('"')
        whatItSays = noQuotes[1];
        switchTable(split[0])
    });

}
var switchTable = function(control) {

switch (control) {
    case "concert-this":
        concert(whatItSays);
        break;
    case "spotify-this-song":
        spotifySong(whatItSays);
        break;
    case "movie-this":
        movie(whatItSays);
        break;
    case "do-what-it-says":
        filesystem();
        break;
    default:
    console.log(control);    
    console.log("Please enter a real command: concert-this, spotify-this-song, movie-this, or do-what-it-says")
}
}

switchTable(control);
