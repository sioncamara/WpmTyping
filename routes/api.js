const express = require("express") ;

const router = express.Router();
const Quote = require("../models/Quote") 

// Routes
router.get("/", (req, res) => {
   Quote.find()
   .then(quotes => res.json(quotes))
   .catch(err => res.status(400).json('Error: ' + err));
  
  });

  router.post("/save", (req, res) => {
      console.log("Body:", req.body);

      const title = req.body.title;
      const author = req.body.author;
      const quote = req.body.quote;

      const newQuote = new Quote({
          title,
          author,
          quote

      })
      console.log(newQuote);

      newQuote.save()
  .then(() => res.json('Quote added!'))
  .catch(err => res.status(400).json('Error: ' + err));
  })
  
  router.get("/name", (req, res) => {
    const data = {
      username: "Happier Feet",
      age: 20,
    };
  
    Quote.find({})
      .then((data) => {
        console.log("Data: ", data);
          res.json(data);
      })
      .catch((error) => console.log(error));
  
  });

  module.exports =  router;