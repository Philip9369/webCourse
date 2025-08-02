const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank."],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank."],
  },
});

userSchema.statics.findAndValidate = async function (username, password) {
  const foundUser = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, foundUser.password);
  return isValid ? foundUser : false;
};

userSchema.pre("save", async function (next) {
  this.password = await bcyrpt.hash(this.password, 12);
  next();
});

//   const hash = await bcyrpt.hash(password, 12);

module.exports = mongoose.model("User", userSchema);
