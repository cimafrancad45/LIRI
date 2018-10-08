//node requirements
var fs = require("fs")
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var inquirer = require("inquirer");
var keys = require("keys.js")

//variables for obtaining user inquiries.

//gets twitter tweets
var client = new Twitter(keys.twitter);

//gets spotify music info
var spotify = new Spotify(keys.spotify);

//gets OMDB movie info
var omdb = new MovieData();

inquire
