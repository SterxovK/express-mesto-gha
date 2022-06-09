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

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/", userRouter);
app.use("/", cardRouter);

//ДЛЯ ПОЛУЧЕНИЯ ID пользователя, временное решение

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
