require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
import path from "path";
const coursesRoutes = require("./routes/courses");
const categoriesRoutes = require("./routes/categories");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const __dirname = path.resolve();

// routes
app.use("/api/courses", coursesRoutes);
app.use("/api/categories", categoriesRoutes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
