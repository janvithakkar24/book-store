import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import router from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

config();
const PORT = process.env.PORT || 4000;
const MongoDBURI = process.env.MongoDBURI;

// Connect to MongoDB
try {
  mongoose.connect(MongoDBURI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error(error);
}

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// defining routes
app.use("/book", router);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("BookStore running on port: ", PORT);
});
