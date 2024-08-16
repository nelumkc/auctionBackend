// importing packages
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// require('dotenv').config();
require("dotenv").config();

// setups
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import  models 
const Bid = require('./models/bid');
const Photo = require('./models/photo');

// Mount the router middleware at a specific path
//app.use('/api', bid);
//get all photos
app.get("/", (req, res) => {
    Photo.find()
      .then((record) => res.json(record))
      .catch((err) => res.status(500).json("Error: " + err));
  });
  
  //get by id
  app.get("/:id", (req, res) => {
    Photo.findById(req.params.id)
      .then((record) => res.json(record))
      .catch((err) => res.status(500).json("Error: " + err));
  });

// Add a new photo
app.post("/photos", (req, res) => {
    const url = req.body.url;

    const newPhoto = new Photo({
        url,
        bids: [], 
    });

    newPhoto
        .save()
        .then(() => res.json(newPhoto))
        .catch((err) => res.status(500).json("Error: " + err));
}); 


//add bid
app.post("/:id/bid", async(req, res) => {
    const { id } = req.params;
    const { biddername, bidamount } = req.body;

    console.log("Received bidData:", req.body);
  
    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            console.error("Photo not found:", id);
            return res.status(404).json("Photo not found");
        }

        // Add the new bid directly as an object
        photo.bids.push({ biddername, bidamount });

        // Save the updated photo with the new bid
        const updatedPhoto = await photo.save();

        res.json(updatedPhoto); // Send back the updated photo with the new bid included
    } catch (err) {
        console.error("Error adding bid:", err); // Log the error
        res.status(500).json("Error: " + err);
    }
  });

// Connect to MongoDB
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



