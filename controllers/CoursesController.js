var db = require('../config/db');
var enc = require('../utils/encryption');

module.exports = {
  getAllCourses: (req, res, next) => {
    db.query("SELECT * FROM predmeti WHERE predavac_id = $1", [req.user_id])
      .then(resp => {
        res.render('courses/index', {
          courses: resp.rows,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  getFormForCreatingCourse: (req, res) => {
    res.render('courses/new');
  },
  createCourse: (req, res) => {
    db.query("INSERT INTO predmeti(ime, predavac_id) VALUES ($1, $2)", [req.body.ime, req.user_id])
      .then(resp => {
        res.status(201).json({
          msg: "Predmet kreiran"
        });
      })
      .catch(err => {
        res.status(400).json({
          msg: err
        });
      })
  },
  updateCourse: (req, res) => {
    res.send("Update");
  },
  deleteCourse: (req, res) => {
    console.log("Brisemo " + req.params.id);
    db.query("DELETE FROM predmeti WHERE id = $1", [req.params.id])
      .then(resp => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(400);
      });
  }
}