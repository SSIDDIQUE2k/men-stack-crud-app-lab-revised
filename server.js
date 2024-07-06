// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new

const app = express();

// server.js

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

// Import the ASI model
const _ASI_= require("./models/a-s-i.js");
 
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /taxes
app.get("/taxes",  async (req, res) => {
const allTaxes = await _ASI_.find({});
    res.render("taxes/index.ejs", { taxes: allTaxes });
} );

//  Get /tax/new
app.get("/taxes/new", async (req, res) => {
    res.render("taxes/new.ejs");
  });

// GET /taxes/:id
app.get("/taxes/:taxId", async(req, res) => {
    const foundTax = await _ASI_.findById(req.params.taxId);
    res.render('taxes/show.ejs', { tax: foundTax });
  }  );
  // GET localhost:3000/taxes/:taxId/edit
// GET /taxes/:taxId/edit
app.get("/taxes/:taxId/edit", async (req, res) => {
  const foundTax = await _ASI_.findById(req.params.taxId);
  res.render("taxes/edit.ejs", { tax: foundTax });
});

app.put("/taxes/:taxId", async (req, res) => {
  // Handle the 'isPrepared_personal' checkbox data
  if (req.body.isPrepared_personal === "on") {
    req.body.isPrepared_personal = true;
  } else if (req.body.isPrepared_family === "on") {
    req.body.isPrepared_family = true;
  } else {
    req.body.isPrepared_personal = false;
    req.body.isPrepared_family = false;
  }

  
  // Update the fruit in the database
  await _ASI_.findByIdAndUpdate(req.params.taxId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/taxes/${req.params.taxId}`);
});

// POST /taxes
app.post("/taxes", async (req, res) => { 
    if (req.body.isPrepared_personal === "on") {
        req.body.isPrepared_personal = true;
    } else if  (req.body.isPrepared_family=== "on"){
        req.body.isPrepared_family = true;
    } else {
        req.body.isPrepared_personal = false;
        req.body.isPrepared_family = false;
    }

    
      await _ASI_.create(req.body);
      res.redirect("/taxes");
  });

  // delete 
  app.delete("/taxes/:taxId", async (req, res) => {
    await _ASI_.findByIdAndDelete(req.params.taxId);
    res.redirect("/taxes");
  });


// server.js



  

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
