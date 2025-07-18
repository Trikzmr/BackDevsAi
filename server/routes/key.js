const express = require("express");
const router = express.Router();
const ApiKey = require("../models/Key");
const middleware = require("../middleware/authMiddleware")

// util to generate unique random key
const generateUniqueKey = () => {
  return 'key_' + Math.random().toString(36).substr(2, 12);
};

router.post("/create", middleware, async (req, res) => {
  const { name, connectionUri } = req.body;
  const username = req.username;
  if (!username || !name || !connectionUri) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let uniqueKey;
  let isUnique = false;

  // generate a truly unique key
  while (!isUnique) {
    uniqueKey = generateUniqueKey();
    const existing = await ApiKey.findOne({ key: uniqueKey });
    if (!existing) isUnique = true;
  }

  try {
    const newKey = new ApiKey({
      username,
      name,
      key: uniqueKey,
      connectionUri,
    });

    await newKey.save();

    res.status(201).json({ message: "API Key created", apiKey: newKey });
  } catch (err) {
    console.error("Error creating key:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getmyapis", middleware, async (req, res) => {
  try {
    const username = req.username;
    const data = await ApiKey.find({ username: username }); // await the query
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching APIs:", error);
    res.status(500).json({ error: "Failed to fetch API keys" });
  }
});

router.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const username = req.username;
    const { id } = req.params;

    const apiKey = await ApiKey.findOne({ _id: id });

    if (!apiKey) {
      return res.status(404).json({ message: "API Key not found" });
    }

    if (apiKey.username !== username) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await ApiKey.findByIdAndDelete(id);

    res.status(200).json({ message: "API Key deleted successfully" });
  } catch (error) {
    console.error("Error deleting API key:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
