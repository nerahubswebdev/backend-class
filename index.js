import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const port = process.env.PORT;
const db = process.env.DATABASE_URL;

app.get("/", function (req, res) {
  res.send("Hello World cohort 2 class dhhdhdhdh hdjdkjdskdkdkdkdkddk");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// connecting the database to our server
mongoose
  .connect(db)
  .then(() => {
    console.log("the database connected successfully");
  })
  .catch(() => {
    console.log("database did not connect");
  });
