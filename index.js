const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db_config");
const path = require("path");
dotenv.config();
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./homepage.html")); // Adjust the path if necessary
});
app.use("/api/auth", require("./src/routes/auth_routes"));
app.use("/api/blogs", require("./src/routes/blog_routes"));
app.use("/api/comments", require("./src/routes/comment_routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
