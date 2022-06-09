const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { PORT = 3000} = process.env;
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
app.use("*", (req, res) => {
    throw new Error("Страница не найдена");
});


app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
