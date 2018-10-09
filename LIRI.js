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
            console.log("Searching for song...")
            spotify.search({ type: 'track', query: userReq})
                .then(function (response) {
                    var results = JSON.stringify(response).pretty()
                    console.log(results)
                })
                .catch(function (err) {
                    console.log(err);
                });
            break;

    }

})


//gets OMDB movie info
// var omdb = new MovieData();

