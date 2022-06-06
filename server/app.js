const express = require("express");
const path = require("path");
const userRouter = require("./routes/users");
const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
