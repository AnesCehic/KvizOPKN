var db = require('../config/db');

module.exports = {
  getAllQuestions: (req, res) => {
    db.query("SELECT * FROM pitanje WHERE anketa_id=$1", [req.id])
      .then(resp => {
        res.render('questions/index', {
          pitanja: resp.rows,
          id: req.id
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  addQuestion: (req, res) => {
    db.query("INSERT INTO pitanje(tekst, anketa_id) VALUES($1, $2);", [req.body.tekst, req.id])
      .then(resp => {
        res.redirect('/questionnaire/' + req.id + '/questions');
      })
      .catch(err => {
        console.log(err);
      })
  },
  getAnswersForQuestion: (req, res) => {
    db.query("select * from odgovor where pitanje_id = $1;", [req.params.idQuestion])
      .then(resp => {
        res.status(200).json({
          odgovori: resp.rows
        });
      })
      .catch(err => {
        res.sendStatus(400);
      })
  },
  addAnswerForQuestion: (req, res) => {
    res.json(req.body)

    db.query("INSERT INTO odgovor (odgovora, pitanje_id, rjesenje) values($1, $2, $3);",
      [req.body.tekst, req.body.currentQuestionId, req.body.a]
    ).then(resp => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
    })
  }
}