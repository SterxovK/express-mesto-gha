const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { PORT = 3000} = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "62a45dc1d82f1785bff695ce",
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/", userRouter);
app.use("/", cardRouter);
app.use("*", (req, res) => {
    res.status(404).send({message: "Страница не найдена"});
});


app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
