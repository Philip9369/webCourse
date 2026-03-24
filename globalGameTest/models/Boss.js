const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { name } = require("ejs");

const BossSchema = new Schema({
  name: String,
  hp: Number,
});

module.exports = mongoose.model("Boss", BossSchema);
