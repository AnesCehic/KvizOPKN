var db = require('../config/db');

module.exports = {
  listOfQuestionnaires: (req, res) => {
    db.query("SELECT * FROM anketa WHERE predavanje_id=$1 ORDER BY id asc", [req.params.id])
      .then(resp => {
        res.render('quest/index', {
          quests: resp.rows,
          id: req.params.id
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  addQuestionnaire: (req, res) => {
    db.query("INSERT INTO anketa(naziv, code, predavanje_id) VALUES($1, $2, $3);", [
      req.body.naziv, req.body.code, req.body.id
    ]).then(resp => {
      res.redirect('/lecture/' + req.params.id + '/questionnaires');
    }).catch(err => {
      console.log(err);
    });
  },
  updateQuestionnaire: (req, res) => {
    db.query("UPDATE anketa SET naziv=$1, code=$2 WHERE id=$3;", [
      req.body.naziv, req.body.code, req.body.idQ
    ]).then(resp => {
      res.sendStatus(204);
    }).catch(err => {
      console.log(err);
      res.sendStatus(400)
    });
  },
  deleteQuestionnaire: (req, res) => {
    db.query("DELETE FROM anketa where id=$1", [req.params.qId])
      .then(() => {
        res.send(204);
      })
      .catch(err => {
        console.log(err);
      })
  }
}