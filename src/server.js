const express = require("express");

// Initialization
const app = express();

// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(express.json());

// Routes
const router = require("./routes/router.js");
router(app);

module.exports = app;
