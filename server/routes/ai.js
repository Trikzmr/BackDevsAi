const express = require("express");
const router = express.Router();
const ApiKey = require("../models/Key");

router.post("/v1", async (req, res) => {
  const { instructions, key, collectionName, data, oldData } = req.body;
  let context;

  try {
    if (!instructions || !key || !collectionName) {
      res.json("Required Field Missing: instructions, key, collectionName");
      return;
    }

    const apiKeyDoc = await ApiKey.findOne({ key: key });

    if (!apiKeyDoc || !apiKeyDoc.connectionUri) {
      res.json("Invalid Key");
      return;
    }

    // Prepare context
    if (!data && !oldData) {
      context = {
        instructions: instructions,
        Schemaname: collectionName,
        uri: apiKeyDoc.connectionUri,
      };
    } else if (!oldData) {
      context = {
        instructions: instructions + " data: " + data,
        Schemaname: collectionName,
        uri: apiKeyDoc.connectionUri,
      };
    } else {
      context = {
        instructions: instructions + " old Data: " + oldData + " new data: " + data,
        Schemaname: collectionName,
        uri: apiKeyDoc.connectionUri,
      };
    }

    console.log(context);

    const api = "https://aibackdevs.vercel.app/aibackend";
    const container = {
      method: "POST",
      body: JSON.stringify(context),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(api, container);
    const filtered = await response.json();

    // Increment count after successful external API call
    await ApiKey.updateOne({ key: key }, { $inc: { count: 1 } });

    res.status(200).json(filtered);
  } catch (err) {
    console.error("Error creating key:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
