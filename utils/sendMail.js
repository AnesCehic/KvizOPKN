var transport = require("../config/mailer");

module.exports = {
  sendMail: (mails) => {
    transport.sendMail({
      from: '',
      to: '',
      subject: '',
      text: '',
    })
  }
};
