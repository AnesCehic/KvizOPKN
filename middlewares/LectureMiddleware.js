var LectureValidation = require('../validations/LectureValidation');

module.exports = {
  validateLecture: (req, res, next) => {
    const { error } = LectureValidation.lecture.validate(req.body);

    if(error) {
      res.status(400).json({
        msg: error.details[0].message,
      });
    } else {
      next();
    }
  },
}