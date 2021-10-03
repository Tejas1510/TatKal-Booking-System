const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userDataRoute = require("./routes/userData");
const OTPOperatorRoute = require("./routes/OTPOperatorRoute");
const randomTokenRoute = require("./routes/RandomToken");
const internalRoute = require("./routes/RailwayOperatorsRoute");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/userdata", userDataRoute);
app.use("/api/otpOperator", OTPOperatorRoute);
app.use("/api/randomToken", randomTokenRoute);
app.use("/api/internal", internalRoute);

app.get('/',(req,res) =>{
  res.send("Welcome to India Railway Tatkal Reservation System")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Backend is running.");
});