var db = require('../config/db');
var schedule = require('node-schedule');

module.exports = {
  getAllLectures: (req, res) => {
    db.query("SELECT * FROM predavanja WHERE predmet_id = $1", [req.params.id])
      .then(resp => {
        res.render('lectures/index', {
          predavanja: resp.rows,
          id: req.params.id
        })
      })
      .catch(err => {
        console.log(err);
      })
  },
  getFormForAddingLecture: (req, res) => {
    res.render('lectures/new', {
      id: req.params.id
    });
  },
  addLecture: (req, res) => {
    db.query("INSERT INTO predavanja(naziv_predavanja, redni_broj, predmet_id) VALUES($1, $2, $3);",
      [req.body.nazivPredavanja, req.body.redniBroj, req.body.predId]
    ).then(resp => {
      res.sendStatus(201, {
        msg: "Predavanja dodano",
      });
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        msg: err,
      });
    })
  },
  getFormForUpdateLecture: (req, res) => {
    db.query("SELECT * FROM predavanja WHERE id=$1", [req.params.idPred])
      .then(resp => {
        res.render('lectures/update', {
          predavanje: resp.rows[0],
          id: req.params.id
        });
      })
      .catch(err => {
        console.log(err);
      })
  },
  updateLecture: (req, res) => {
    db.query("UPDATE predavanja SET naziv_predavanja=$1, redni_broj=$2 WHERE id=$3",
      [req.body.nazivPredavanja, req.body.redniBroj, req.params.idPred]
    ).then(() => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.status(400).json({
        msg: err
      })
    })
  },
  deleteLecture: (req, res) => {
    db.query("DELETE FROM predavanja WHERE id=$1", [req.params.id])
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  activateLecture: (req, res) => {

    //napraviti route u lectures fajlu i fino dizajnirati controller
    
    let j = schedule.scheduleJob('50 37 1 9 1 4', () => {
      console.log("Scehdule");
    })
  }
}