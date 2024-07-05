// models/fruit.js

const mongoose = require("mongoose");
const  asi_Schema = new mongoose.Schema({
    name: String,
    isPrepared_personal: Boolean,
    isPrepared_family: Boolean,
  });

  const ASI = mongoose.model("ASI", asi_Schema);

    module.exports = ASI;