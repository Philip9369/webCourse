const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {
  secret: "Practice",
  resave: false,
  saveUninitalized: false,
};
app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`Page has been veiwed ${req.session.count} times.`);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcome back, ${username}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
