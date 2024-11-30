const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const connectToMongo = require("./utils/connectToMongo.js");
const userRoute = require("./routes/authRoute.js");
const notesRoute = require("./routes/notesRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotEnv.config();
connectToMongo();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://mern-task-mgmt.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to home route" });
});

app.use("/api/auth", userRoute);
app.use("/api/notes", notesRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    status: "fail",
    message,
    statusCode,
  });
});
app.listen(process.env.PORT, () =>
  console.log("Server is running at port 5000")
);
