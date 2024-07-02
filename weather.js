require("dotenv").config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const ip = req.ip;
res.sendFile(__dirname + "/index.html");


app.post("/", function (req, res) {
  console.log(req.ip + "from post");
const citydata = req.body.cityName; 
const person = req.body.person;

const url =" https://api.openweathermap.org/data/2.5/weather?q="+ citydata +"&appid="+process.env.CLIENT_ID

https.get(url, function (response) {
  console.log(response.statusCode);

response.on("data", function(data){
const weatherData = JSON.parse(data);

  const temp = weatherData.main.temp
  
const weatherDescription = weatherData.weather[0].description;
const icon = weatherData.weather[0].icon;

const imageUrl =" https://openweathermap.org/img/wn/"+icon+"@2x.png"

  
res.render("index",{
  ip,
  temp,
  imageUrl,
  person,
  citydata
});

 });
});

 } );
});


app.listen(port, function () { console.log("server is running on port 3000")

});
