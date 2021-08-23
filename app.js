require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO DB CONNECTED"))
  .catch((e) => console.log(e));

const usersRouter = require("./routes/users/usersRouter");

const app = express();
const originUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "DEPLOY URL";

app.use(cors({ origin: originUrl, credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json("error");
});

module.exports = app;
