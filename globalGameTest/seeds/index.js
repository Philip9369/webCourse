const mongoose = require("mongoose");
const Boss = require("../models/Boss");

mongoose.connect("mongodb://localhost:27017/globalGameTest");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  const HP = Math.floor(Math.random() * 90000) + 10000;
  const bossSeed = new Boss({
    name: "Bread Guy",
    hp: HP,
  });
  await bossSeed.save();
  console.log(bossSeed);
};

seedDB().then(() => {
  db.close();
});
