var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
require("dotenv").config();
const axios = require("axios");
var path = require('path');
let googlekey = process.env.GOOGLE_API_TOKEN;
let newsKey = process.env.NEWS_API_TOKEN;
let GmailUser = process.env.GmailUser;
let GmailPass = process.env.GmailPass;
//let near_by_call = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' ;
let near_by_call = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=restaurant&key=' + process.env.GOOGLE_API_TOKEN ;
let newsUrl = 'https://newsapi.org/v2/top-headlines?country=au&category=health&apiKey=' + process.env.NEWS_API_TOKEN;;
console.log("GmailUser1 is: " + GmailUser);

var transporter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,//true
	port: 25,//465
	auth: {
		user: GmailUser,
		pass: GmailPass
	}, tls: {
		rejectUnauthorized: false
		}
});

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

//retrieve headlines from NewsAPI
app.post('/headlines', function(req, res){	
	console.log('/headlines');
	axios.get(newsUrl).then(response =>{
		//console.log(response.data);
		return res.end(JSON.stringify(response.data));		
	});			
});	
	
app.post('/contactUs',function(req, res){
	console.log('/contactUs/');
	let inputName = req.body.inputName;
	let inputEmail = req.body.inputEmail;
	let inputMessage = req.body.inputMessage;
	transporter.verify(function(error, success) {
	  if (error) {
		console.log(error);
	  } else {
		console.log("Server is ready to take our messages");
	  }	  
	});
	var mailOptions = {
	  from: GmailUser + '@gmail.com',
	  to: GmailUser + '@gmail.com',
	  replyTo: inputEmail,
	  subject: inputName + '(from:' + inputEmail + ') has sent you a message' ,
	  text: inputMessage
	};
	console.log("mailOptions is:");
	console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	  res.end("OK");
	});
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
  console.log('App started');
})