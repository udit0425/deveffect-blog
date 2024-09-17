// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Blog = require("./models/Blog");

// Initialize the app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://balajiraod2002:balajirao2002@cluster0.vludm4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Routes
app.post("/api/blogs", async (req, res) => {
  const { title, category, description } = req.body;

  try {
    const blog = new Blog({ title, category, description });
    await blog.save();
    res.status(201).json({ message: "Blog submitted successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Error submitting blog", error: err });
  }
});

app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find(); // Retrieve all blogs from the database
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving blogs", error: err });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
