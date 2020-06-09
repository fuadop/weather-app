const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

app = express();

app.set("view engine", "ejs");

app.use(bodyParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const name = req.body.userName;
  const cityName = req.body.cityName;
  const apiKey = "217fbb0f9f2a516da177fffe3cc1bef9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  https.get(url, (resp) => {
    if (resp.statusCode != 200) {
      res.sendFile(__dirname + "/404.html");
    } else {
      resp.on("data", (data) => {
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const description = weather.weather[0].description;
        const iconId = weather.weather[0].icon;
        const icon = "http://openweathermap.org/img/wn/" + iconId + "@4x.png";
        res.render("index", {
          currentTemp: temp,
          currentDescription: description,
          userName: name,
          city: cityName,
          src: icon,
        });
      });
    }
  });
});

const port = process.env.PORT || 2500;
app.listen(port, () => console.log("istening on port :" + port));
