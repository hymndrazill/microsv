const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require('dotenv').config();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    if (!users) {
      res.status(500).json("No users found");
    }
    console.log("did we find users", users);
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    console.log("errrrr", err);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Request received at /users endpoint");
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.log("Password received:", password);
    const salt = bcrypt.genSaltSync(10); 
    const hashedPassword = bcrypt.hashSync(password, salt); 
    console.log("Hashed password:", hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (e) {
    console.error("Error logging in:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
