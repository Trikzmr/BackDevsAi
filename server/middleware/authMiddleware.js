// Purpose: Middleware for authenticating user
const jwt = require('jsonwebtoken'); 
const User = require('../models/User');
const cookieParser = require("cookie-parser"); 
require('dotenv').config();
const express = require('express');
const router = express.Router();

const authenticate = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("Authentication middleware called");
            return res.status(401).json({ message: "Unauthorized 1" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const {username} = user;
        req.username = username;
        console.log({username});
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

exports = module.exports = authenticate;