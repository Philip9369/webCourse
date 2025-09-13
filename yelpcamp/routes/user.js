const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const registerUser = await User.register(user, password);
  console.log(registerUser);
  req.flash("success", "Welcome to Yelp Camp!");
  res.redirect("/campgrounds");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!");
    res.redirect("/campgrounds");
  }
);
module.exports = router;
