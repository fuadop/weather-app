const router = require("express").Router();
const https = require("https");

router.get("/", (req, res) => {
  res.render("home", { pageTitle: "Weatherer" });
});

router.post("/result", (req, res) => {
  const cityName = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  https.get(url, (resp) => {
    if (resp.statusCode != 200) {
      res.status(404).render("404", { pageTitle: "404" });
    } else {
      resp.on("data", (data) => {
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const description = weather.weather[0].description;
        const iconId = weather.weather[0].icon;
        const icon = "http://openweathermap.org/img/wn/" + iconId + "@4x.png";
        res.render("result", {
          pageTitle: "result",
          currentTemp: temp,
          currentDescription: description,
          city: cityName,
          src: icon,
        });
      });
    }
  });
});

module.exports = router;
