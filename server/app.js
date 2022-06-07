const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require("./routes/users");
const PORT = 3000;

const app = express();

app.use(bodyParser.json());
//ДЛЯ ПОЛУЧЕНИЯ ID пользователя, временное решение
app.use((req, res, next) => {
  req.user = {
    _id: "629f980cd6d304b8fe640380",
  };
  next();
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
