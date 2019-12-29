var CourseValidation = require("../validations/CourseValidation");

module.exports = {
  courseValidate: (req, res, next) => {
    const { error } = CourseValidation.course.validate(req.body);

    if (error) {
      res.status(400).json({
        msg: error.details[0].message
      });
    } else {
      next();
    }
  }
}