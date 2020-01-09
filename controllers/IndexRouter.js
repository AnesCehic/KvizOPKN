module.exports = {
  mainRoute: (req, res) => {
    res.render('index');
  },
  lectureQuestions: (req, res) => {
    res.render('index/index');
  }
}