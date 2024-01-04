import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRoute from "./routes/AuthRoutes.js";
import JobRoute from "./routes/JobRoutes.js";
import UserRoute from "./routes/UserRoutes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDb connected!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});

app.use("/api/auth", AuthRoute);
app.use("/api/jobs", JobRoute);
app.use("/api/users", UserRoute);
