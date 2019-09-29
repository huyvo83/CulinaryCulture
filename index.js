var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
var path = require('path');
let googlekey = process.env.GOOGLE_API_TOKEN;
//let near_by_call = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' ;
let near_by_call = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&key=' + process.env.GOOGLE_API_TOKEN ;
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


app.post('/findlocation', function(req, res){	
	console.log('/findlocation');
    let location = req.body.location; //received input 1 from client side
	let keyword = req.body.keyword; //received input 2 from client side
	let radius = req.body.radius; //received input 2 from client side
	let userInput = location + keyword + radius;
	findLocation(userInput, near_by_call,res);	
	
});

//function to sendLocation to google server
function findLocation(userinput, call_url, res) {
	console.log("in findLocation");
	console.log('userinput is: ' + userinput);
	call_url = call_url + userinput;
	console.log('call_url is: ' + call_url);
  axios.post(call_url).then(response => {
    console.log("Message posted");  		
	//console.log(response.data);
    return res.end(JSON.stringify(response.data));
  })
  .catch(error =>{
	  console.log('error');
    throw error;
  });
}


app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})