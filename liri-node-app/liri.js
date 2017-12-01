
// This variable is retriveving API data from the keys.js file 
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
// console.log(keys);

// This variable is listening for the function calls "my-tweets", "spotify-this-song", "movie-this", or  "do-what-it-says" 
var userInput = process.argv[2]
var value = "";
// console.log(userInput);
// console.log(value);

// my-tweets
// ****************************************************************************
// This variable is retrieving Twitter's functions/obejects etc   
var Twitter = require('twitter');
// console.log(keys);




// spotify-this-song
// ****************************************************************************
var Spotify = require('node-spotify-api');
//  console.log(keys);



// movie-this

// do-what-it-says


var runSwitch = function(userInput, thing){
  

  switch (userInput) {
      case "my-tweets":
          console.log("mytweetsrule");
          getTweets()
          break;
      case "spotify-this-song":
          // console.log("you cool");
           getSpotify(thing)
          break;
      case "movie-this":
          for (var i = 3; i < process.argv.length; i++) {
            //take the first index add it to my value and then get the next index and add that to value with a space
            if(value === ""){
              value = value + process.argv[i];
            }else{
              value = value + " " + process.argv[i]
            }
          }
          console.log(value, "this is our value")
          getMovie(value);
          break;
      case "do-what-it-says":
          doWhat()
          break;
  
      default:
          break;
  }
}

function getTweets(){

    var client = new Twitter(keys.twitterKeys);

    var params = { screen_name: 'joerogan' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(response);

            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
}

function getSpotify(thing) {

    var spotify = new Spotify(keys.spotifyKeys);
       
    //   search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

      spotify.search({ type: 'track', query: thing, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        
        console.log(' ');
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log(' ');


      
      });

    }

  function getMovie(value) {
      if (value === "" ) {
          value = 'mr.nobody';

          console.log(value);
      }     
  
      var queryURL = "https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
      
      
        request(queryURL, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var data = [];
            var jsonData = JSON.parse(body);
            console.log(jsonData);
          };
      });
  };
  function doWhat() {
    fs.readFile('./random.txt', 'utf8', function (err, data){
      if (err) throw err;
      console.log(data);
      var format = data.split(",")
      console.log(format);
      runSwitch(format[0], format[1])
    });
  }

runSwitch(userInput)
    