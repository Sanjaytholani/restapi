require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const postRoutes = require("./routes/posts");
const bodyParser = require("body-parser");
const cors = require("cors");

const url = process.env.DB_CONNECTION;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Lets build a REST API");
});

app.use("/posts", postRoutes);
app.listen(process.env.PORT || 8000);
