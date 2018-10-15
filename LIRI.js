//dotenv config
require("dotenv").config()

//dependencies

var fs = require("fs")
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js")

//node inputs
var userCmd = process.argv[2];
var userReq = "";
var randomAction = [];

//loop for searches with spaces
for (var i = 3; i < process.argv.length; i++) {
    userReq = userReq + " " + process.argv[i]

};


//gets twitter tweets
var client = new Twitter(keys.twitter);

//gets spotify music info
var spotify = new Spotify(keys.spotify);


//request functions
//twitter function
function tweetGet() {
    console.log("Searching tweets...")
    client.get("statuses/user_timeline", function (error, tweets, response) {
        for (i = 0; i < tweets.length; i++) {
            console.log("Tweet: " + tweets[i].text +
                "\n" +
                " Created At: " + tweets[i].created_at +
                + "\n" + "\n"
                + "--------------------");
        };
    });
};
//spotify function
function spotifyGet() {
    console.log("Searching for song...\n")
    if (userReq === "") {
        console.log("There's no search query!")
    } else {
        spotify.search({ type: 'track', query: userReq })
            .then(function (response) {
                for (i = 0; i < response.tracks.items.length; i++) {
                    //response data
                    var songResult = response.tracks.items[i]
                    //object created with search results
                    var songData = {
                        artist: songResult.artists[0].name,
                        songName: songResult.name,
                        preview: songResult.preview_url,
                        album: songResult.album.name
                    };
                    // var results = JSON.stringify(response, null, 4)
                    var resultNumber = i + 1

                    console.log("Result " + resultNumber + ":");
                    console.log("Artist: " + songData.artist);
                    console.log("Song Name: " + songData.songName);
                    console.log("Preview link: " + songData.preview);
                    console.log("Album: " + songData.album);
                    console.log("\n ------------------------ \n")
                };
            })
            .catch(function (err) {
                console.log(err);
            });
    };
};
//movie function
function movieGet() {
    if (userReq === "") {
        console.log("There's no search query!")
    } else {
        console.log("Searching for movie...")

        var omdbSearch = "http://www.omdbapi.com/?t=" + userReq + "&y=&plot=short&apikey=40e9cece";

        request(omdbSearch, function (error, response, body) {

            var movie = JSON.parse(body);

            console.log("\n")
            console.log("Title: " + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors + "\n");
        });
    };
};

request(userCmd, function (error, response, body) {
    switch (userCmd) {
        //twitter function
        case "my-tweets":
            tweetGet();
            break;
        case "spotify-this-song":
            //spotify function
            spotifyGet()
            break;
        case "movie-this":
            movieGet();
            break;
        case "do-what-it-says":
            fs.readFile("do-something.txt", "utf8", function (error, data) {


                // console error message
                if (error) {
                    return console.log(error);
                }

                // Then split it by commas (to make it more readable)
                randomAction = data.split(",");

                // We will then re-display the content as an array for later use.

                var doTheThing = randomAction[Math.floor(Math.random() * 3)];
                console.log(doTheThing);
                
                switch (doTheThing) {
                    case "tweeter":
                        tweetGet();
                        break;
                    case "spootify":
                        userReq = "Tell Your World"
                        spotifyGet();
                        break;
                    case "moovie":
                        userReq = "Swiss Army Man"
                        movieGet();
                        break;
                }
            });
            break;
        default:
            console.log("I'm sorry, that command is invalid.");
            console.log("The following commands are supported:");
            console.log("- my-tweets");
            console.log("- spotify-this-song 'search query'");
            console.log("- movie-this 'search query'");
            console.log("- do-what-it-says *Functionality not supported yet");
    }

})

//gets OMDB movie info
// var omdb = new MovieData();

