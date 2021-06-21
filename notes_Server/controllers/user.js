const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

const UserModal = require("../models/user.js")
dotenv.config();

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ username });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ result: oldUser });
  } catch (err) {
    console.log("ereer", err.message)
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signup = async (req, res) => {
  //const { username, password, email, name } = req.body;

  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const result = await UserModal.create({ ...req.body, password });

    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
