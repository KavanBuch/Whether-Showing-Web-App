const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const query = req.body.CityName;
  const apikey = `97d7aa86479d0e96be2bbe5ee2200cd2`;
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${units}`;
  if (query === undefined) {
    res.send("<h1>Not found anything</h1>");
  } else {
    https.get(url, (response) => {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(
          `<h1>The temprerature of ${query} is ${temp} degree celcius</h1>`
        );
        res.write(`<p>The weather of ${query} is ${des}.</p>`);
        res.write(`<img src="${imgURL}">`);
        res.send();
      });
    });
  }
});

app.listen(80, () => {
  console.log("Server is running on port80");
});
