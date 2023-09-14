const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./models");

const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("open", function () {
  console.log("Connected to database successfully!");
});

db.on("error", function (error) {
  console.log("Error connecting to database:", error);
});

const saltRounds = 10;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function checkPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(201).json({ token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordCorrect = await checkPassword(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
});

app.put("/update", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token is required" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { weight, record } = req.body;

  if (weight === undefined && record === undefined) {
    return res
      .status(400)
      .json({ error: "Either weight or record must be provided" });
  }

  const updatedFields = {};
  if (weight !== undefined) updatedFields.weight = weight;
  if (record !== undefined) updatedFields.record = record;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ weight: user.weight, record: user.record });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token is required" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/userInfo", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token is required" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      weight: user.weight,
      record: user.record,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
