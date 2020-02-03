var mailer = require("nodemailer");

let transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

module.exports = transport;