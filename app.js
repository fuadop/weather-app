require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mainRoute = require("./routes/main.routes");

const port = process.env.PORT || 4000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

// middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(mainRoute);

// 404
app.use((req, res) => {
  res.status(302).redirect("/");
});

app.listen(port, () => console.log(`listening on port: ${port}`));
