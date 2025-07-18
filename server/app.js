const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const ai = require("./routes/ai")
dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // replace with your frontend domain
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/key", require("./routes/key"));
app.use("/api/", ai);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
