// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
import mongoose from "mongoose";
try {
  await mongoose.connect("mongodb://0.0.0.0/", {
    dbName: "players",
  });
  console.log("Connected to yourDB-name database");
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
const User = mongoose.model("players", PlayerSchema);
User.createIndexes();

// For backend and express
import express from "express";
const app = express();
import cors from "cors";
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      resp.send(req.body);
      console.log(result);
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});
app.listen(5000);
