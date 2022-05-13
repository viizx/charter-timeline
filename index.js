const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const reservationRoute = require("./routes/reservations");
const cors = require("cors");
const cron = require("node-cron");
const deleteOld = require("./utility/deleteOld");
dotenv.config();

//Connect to DB

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db!")
);

//Middleware
app.use(cors());
app.use(express.json());

cron.schedule("* * * * *", function () {
  console.log("every minute");
  deleteOld();
});

//Routes Middleware
app.use("/api/user", authRoute);
app.use("/api/reservation", reservationRoute);

app.get("/", (req, res) => {
  res.send("tu smo");
});
//Listening on port
app.listen(3000, () => console.log("Server up and running"));
