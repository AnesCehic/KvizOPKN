var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayout = require("express-ejs-layouts");
var db = require("./config/db");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require("./routes/courses");
var lecturesRouter = require('./routes/lectures');
var questionnaireRouter = require('./routes/questionnaires');
var questionsRouter = require('./routes/questions');

// multer
var upload = require('./utils/upload');

// Middlewares
var authMiddleware = require("./middlewares/AuthMiddleware");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true)
app.use(expressLayout)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// multer handler
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.status(400).json({
        msg: err.message
      });
    } else {
      res.json(req.file);
    }
  })
});

app.use('/questionForProfessor', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', authMiddleware.checkAuth, coursesRouter);
app.use('/courses', authMiddleware.checkAuth, lecturesRouter);
app.use('/lecture', authMiddleware.checkAuth, questionnaireRouter);
app.use('/questionnaire/:id/questions', authMiddleware.checkAuth, (req, res, next) => {
  req.id = req.params.id;
  next();
}, questionsRouter);
app.get('/start/:id', authMiddleware.checkAuth, (req, res) => {
  res.render("quiz", {
    id: req.params.id
  });
});
app.get("/start/:id/getQuestions", (req, res) => {
  db.query("select pit.* from anketa a left join pitanje pit on a.id=pit.anketa_id where a.id = $1;", [req.params.id])
    .then(resp => {
      res.json({
        pitanja: resp.rows,
      })
    })
    .catch(err => {
      console.log(err);
    })
});
app.get("/joinQuiz", (req, res) => {
  res.render("quiz/index");
})
app.post("/joinQuiz/checkCode", (req, res) => {
  db.query("select * from predavanja pr left join anketa a on a.predavanje_id = pr.id where code = $1 and status = true", [req.body.kod])
    .then(resp => {
      console.log(resp.rows);
      if(resp.rows.length === 0) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
})
app.get("/joinQuiz/enter", (req, res) => {
  res.render("quiz/enter");
});
app.get('/igraj', (req, res) => {
  res.render("quiz/igraj");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
