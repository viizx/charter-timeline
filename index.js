const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");

dotenv.config();

//Connect to DB

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db!")
);

//Middleware
app.use(cors());
app.use(express.json());

//Routes Middleware
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
  res.send("tu smo");
});
//Listening on port
app.listen(3000, () => console.log("Server up and running"));
