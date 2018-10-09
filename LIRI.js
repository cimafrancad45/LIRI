//dotenv config
require("dotenv").config()

//dependencies

var fs = require("fs")
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var keys = require("./keys.js")

//node inputs
var userCmd = process.argv[2];
var userReq = "";


//loop for searches with spaces
for (var i = 3; i < process.argv.length; i++) {
    userReq = userReq + " " + process.argv[i]

};



//gets twitter tweets
var client = new Twitter(keys.twitter);

//gets spotify music info
var spotify = new Spotify(keys.spotify);

//request function
request(userCmd, function (error, response, body) {
    switch (userCmd) {
        case "my-tweets":
            console.log("Searching tweets...")
            client.get("statuses/user_timeline", function (error, tweets, response) {
                console.log(tweets)
            })
            break;
        case "spotify-this-song":
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
                            var resultNumber = i+1
                            
                            console.log("Result " + resultNumber + ":");
                            console.log("Artist: " + songData.artist);
                            console.log("Song Name: " + songData.songName);
                            console.log("Preview link: " + songData.preview);
                            console.log("Album: " + songData.album);
                            console.log("\n ------------------------ \n")
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            break;
        case "movie-this":
            if (userReq === "") {
                console.log("There's no search query!")
            } else {
                console.log("movie request:" + userReq)
            }
            break;
        case "do-what-it-says":
            console.log("DO IT NOW")
            break;
        default:
            console.log("I'm sorry, that command is invalid.");
            console.log("The following commands are supported:");
            console.log("- my-tweets");
            console.log("- spotify-this-song 'search query'");
            console.log("- movie-this 'search query'");
            console.log("- do-what-it-says");
    }

})


//gets OMDB movie info
// var omdb = new MovieData();

