const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require("./server/routes/users");
const cardRouter = require("./server/routes/cards");
const PORT = 3000;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "629f980cd6d304b8fe640380",
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/", userRouter);
app.use("/", cardRouter);


app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
