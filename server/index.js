import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { UserRouter } from "./routes/User.js";

// connect mongodb

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static("uploads"));
//app.use("/", express.static(path.join(__dirname + "uploads")));

mongoose
  .connect("mongodb://127.0.0.1:27017/authendication")
  .then(() => {
    console.log("DB Connect successfully");
  })
  .catch((error) => {
    console.log(error);
  }); //localhost = 127.0.0.1

app.listen(process.env.PORT, () => {
  console.log(`App running successfully ${process.env.PORT}`);
});
