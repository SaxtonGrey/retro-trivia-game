// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

try {
  await mongoose.connect("mongodb://0.0.0.0/", {
    dbName: "players",
  });
  console.log("Connected to players-leaderboard");
} catch (err) {
  console.log(err);
}

// Schema for users of app
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});
const Player = mongoose.model("players", PlayerSchema);

Player.createIndexes();

// For backend and express

const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.get("/players", async (req, res) => {
  const allPlayers = await Player.find().sort({ score: -1 }).limit(5);
  res.send((allPlayers));
});

app.post("/players", async (req, res) => {
  try {
    const user = new Player(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      res.send(req.body);
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});
app.listen(5000);
