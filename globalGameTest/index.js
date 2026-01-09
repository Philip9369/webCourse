const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");

mongoose
  .connect("mongodb://localhost:27017/globalGameTest")
  .then(() => {
    console.log("MONGO CONNECTION SUCCESSFUL!");
  })
  .catch((err) => {
    console.log("MONGO ERROR");
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.use(express.static("public"));
// This line makes all files that require access to the folder "public" to no longer require the need to type "public"
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/home", (req, res) => {
  res.render("general/home");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
