const jwt = require("jsonwebtoken");
const axios = require("axios");
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;    
    const response = await axios.post("http://users-service:5000/users", {
      username,
      email,
      password
    }, {
      timeout: 5000 
    });

    if (response) {
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ message: "User couldn't be registered" });
    }
  } catch (e) {
    console.log("Error registering user:", e);
    return res.status(500).json({ e: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    // to fix
    const { email, password } = req.body;
    const response = await axios.get("http://users-service:5000/users", {
      email,
      password,
    });
    if ((response.status = 201)) {
      const token = jwt.sign(
        { email: response.data.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Authentication failed" });
    }
  } catch (e) {
    console.log("Error logging in:", e);
    res.status(500).json({ e: "something went wrong" });
  }
};

module.exports = { register, login };
