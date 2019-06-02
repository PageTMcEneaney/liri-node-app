require("dotenv").config();

var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require('fs');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var control = process.argv[2];
var whatItSays = "";
var txt = ""

var logInput = function() {

    if (process.argv[3]) {
        txt = process.argv[3];
    } else {
        fs.readFile("random.txt", "utf8", function (err, data) {
            var split = data.split(",");
            var noQuotes = split[1].split('"')
            txt = noQuotes[1];
            if (err) throw err;

        });
    }

    fs.appendFile("log.txt", "\n\n" + control + ": " + txt, function (err) {
        if (err) throw err;
        });
}
var logData = function(condensed) {
    fs.appendFile("log.txt", condensed, function (err) {
        if (err) throw err;
    });
}

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
            console.log("\nYou searched: " + artist);

            for (var i = 0; i < 5; i++) {
                var condensed = "\nLineup: " + response.data[i].lineup + "\nVenue Name: " + response.data[i].venue.name + 
                "\nVenue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + 
                "\nDate of Event: " + (moment(response.data[i].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")) +
                "\n------------------------------";

                console.log(condensed)

                logData(condensed);
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
        var condensed = "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " +
        data.tracks.items[0].name + "\nAlbum: " + data.tracks.items[0].album.name + "\nLink: " + 
        data.tracks.items[0].href + "\n------------------------------";
        console.log("You searched: " + song);
        logData(condensed);
        console.log(condensed);

    });
}
var movie = function (whatItSays) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    var movie = "Mr. Nobody";


    if (process.argv[3]) {
        movie = process.argv[3];
    } else if (whatItSays !== "") {
        movie = whatItSays;
    }

    queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


    axios.get(queryUrl).then(
        function (response) {

            var condensed = "\nTitle: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " +
            response.data.Ratings[0].Value + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + 
            "\nProduction Country: " + response.data.Country + "\nLanguages: " + response.data.Language + 
            "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n------------------------------";
            console.log("You searched: " + movie);
            logData(condensed);
            console.log(condensed);
    
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
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var split = data.split(",");
        var noQuotes = split[1].split('"')
        whatItSays = noQuotes[1];
        txt = noQuotes[1];
        switchTable(split[0])
    });

}
var switchTable = function (control) {
    logInput();
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
            doWhatItSays();
            break;
        default:
            console.log("Please enter a real command: concert-this, spotify-this-song, movie-this, or do-what-it-says")
    }
}

switchTable(control);
