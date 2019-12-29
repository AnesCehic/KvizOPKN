const Cryptr = require("cryptr");
const cryptr = new Cryptr("sifra");
const bcrypt = require("bcryptjs");

var salt = bcrypt.genSalt(10);

module.exports = {
  encrypt: (a) => {
    return cryptr.encrypt(a);
  },
  decrypt: (a) => {
    return cryptr.decrypt(a);
  },
  encryptPassword: (password) => {
    return bcrypt.hashSync(password, 8);
  },
  checkPassword: (password, hashedPassword) => {
    if (bcrypt.compareSync(password, hashedPassword)) {
      return true;
    } else {
      return false;
    }
  }
}