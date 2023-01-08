const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());

const authentitacionMiddleware = require('./middlewares/authenticationMiddleware')

app.use('/', indexRouter);
app.use('/users', authentitacionMiddleware, usersRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  console.error(err);
  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
