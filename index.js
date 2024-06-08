import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoute from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;
const db = process.env.DATABASE_URL;

app.get("/", function (req, res) {
  res.send("Hello World cohort 2 class dhhdhdhdh hdjdkjdskdkdkdkdkddk");
});

// our other rouths in the server
app.use("/user", UserRoute);

// connecting the database to our server
mongoose
  .connect(db)
  .then(() => {
    console.log("the database connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("database did not connect");
  });
