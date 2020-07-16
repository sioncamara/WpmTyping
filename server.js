const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config(); // can't reed if you don't require
const  apiRouts = require("./routes/api") ;

const app = express();
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI || process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", apiRouts);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
