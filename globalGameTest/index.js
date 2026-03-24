const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const Boss = require("./models/Boss");
const app = express();

const userRoutes = require("./routes/user");

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

const sessionConfig = {
  secret: "challengeman",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // In Milliseconds 1000 is seconds * Minutes * Hours * Days
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/home", (req, res) => {
  res.render("general/home");
});

app.put("/userAction", (req, res) => {
  const action = req.body.action;

  if (action === "Heal") {
    // save logic
  } else if (action === "Attack") {
    // delete logic
  } else if (action === "Defend") {
    // update logic
  }

  console.log(action);
  res.redirect("/home");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
