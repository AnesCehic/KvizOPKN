var encrypt = require("../utils/encryption");

module.exports = {
  checkAuth: (req, res, next) => {
    var id = req.cookies["id"];
    if (!id) {
      res.redirect('/users/login');
    } else {
      try {
        req.user_id = encrypt.decrypt(id);
        next();
      } catch (error) {
        console.log(error);
        res.redirect("/users/login");
      }
    }
  }
}