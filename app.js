//to create node app we require express module
const express=require("express");
//use a native https module to use external api informaion in our browser
const https=require("https"); 
//to get what the user typed
const bodyParser=require("body-parser");
//initialise new express app
const app=express();

//to let our app to use the body parser
app.use(bodyParser.urlencoded({extended: true}));

//what should happen when a user try to acess my home page
app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html"); 
});
//to get the post
app.post("/", function(req, res){
    const query="res.body.cityName";
    const apiKey="00a96d2049b6c4507117f76d521a578e"; //authentication
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=metric";

    https.get(url, function(response){
        //to know the status of the code
        console.log(response.statusCode); 

        //in addition we can tap into the response we get and call a method called on, and search through it for some data.
        response.on("data", function(data){
            //to convert json into a javascript object using JSON parser
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p> The Weather is currently" +  weatherDescription + "<p>");
            res.write("The temperature in " + query + "is" + temp + "degrees Celcius")
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
})

    

//Which port i want to listen the response
app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

//to run use nodemon app.js