var db = require("../config/db");
var enc = require("../utils/encryption");

module.exports = {
  login: (req, res) => {
    res.render("users/login");
  },
  register: (req, res) => {
    res.render("users/register");
  },
  postLogin: (req, res) => {
    db.query("SELECT * FROM predavac WHERE email = $1 LIMIT 1",
      [req.body.email]
    ).then(resp => {
      if (resp.rows[0] === undefined) {
        res.status(401).json({
          msg: "Wrong email or password",
        })
      } else if (enc.checkPassword(req.body.password, resp.rows[0].password)) {
        res.cookie("id", enc.encrypt(resp.rows[0].id))
          .status(200)
          .json({
            msg: "Login successful!",
          });
      } else {
        res.status(401).json({
          msg: "Wrong email or password",
        })
      }
    })
  },
  postRegister: (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    db.query("INSERT INTO predavac(first_name, last_name, email, password) values($1, $2, $3, $4)",
      [firstName, lastName, email, enc.encryptPassword(password)]
    ).then(resp => {
      res.status(200).json({
        msg: "Register",
      });
    }).catch(err => {
      let msg = "";

      if (err.routine === "_bt_check_unique" && err.constraint === "predavac_email_key") {
        msg = "User with that email already exists!";
      }

      res.status(400).json({
        msg
      });
    })
  },
  logout: (req, res) => {
    console.log("Tu smo");
    res.clearCookie('id');
    res.redirect("/users/login");
  }
}