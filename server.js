// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package


const app = express();

// server.js

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Import the ASI model
const _ASI_= require("./models/a-s-i.js");
 
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
//  Get /tax/new
app.get("/taxes/new", async (req, res) => {
    res.render("taxes/new.ejs");
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
