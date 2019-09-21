var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
var path = require('path');

let near_by_call = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&radius=1500&type=restaurant&key=' + process.env.GOOGLE_API_TOKEN ;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.resolve('./public')));
app.get('/', function(request, response){
	response.sendFile(path.resolve('./public/index.html'));
	console.log('create index.html');
	
});

//sending verify message to user
app.post('/requestlocation', function(req, res){	
	console.log('/requestlocation');
    var latitude = req.body.latitude; //received input 1 from client side
	var longitude = req.body.longitude; //received input 2 from client side
	sendLocation(latitude, longitude, near_by_call,res);	
	
});


//function to sendLocation to google server
function sendLocation(latitude, longitude, call_url, res) {
	console.log("in sendLocation");
	var user_location = latitude + ',' + longitude;
	console.log('user_location is: ' + user_location);
	console.log('call_url is: ' + call_url);
  axios.post(call_url, {
    location: user_location    
  }).then(response => {
    console.log("Message posted");    
	console.log(response.data);
    res.end("ok");
  })
  .catch(error =>{
    throw error;
  });
}


app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})