//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res){

res.sendFile(__dirname+"/index.html");


});

app.post('/',function(req, res){
  const query= req.body.CityName;
  const apiKey ="d82fa5c490c04fafb55154ba84a6d193";
  const unit = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units="+unit;
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const weatherdescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  res.write("<p> the weahter is currently " + weatherdescription + "</p>");
  res.write("<h1>The temparature in " + query +" is " + temp + " degree calcius</h1>");
  res.write("<img src = " + imageURL + ">");
  res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("Server running is port 3000");
});
