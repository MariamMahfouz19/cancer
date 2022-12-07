var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
const cors = require("cors");
//const port=  process.env.port||5000 
const mongoose = require("mongoose");
const swaggerJsdoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
const swaggerDocuments=require('./swagger.json')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());

app.use(logger("dev"));
mongoose.connect(
  'mongodb+srv://MariemMahfouz:yFqp5q7h989Ik0a2@cluster0.b465cp1.mongodb.net/?retryWrites=true&w=majority',
  
  (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("connecting to db");
    }
  }
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocuments))






app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.json({
    message: err.message,
  });
});

module.exports = app;
