var express = require("express");
const router = express.Router();

var CoursesController = require("../controllers/CoursesController");
var courseMiddleware = require("../middlewares/CourseMiddleware");

router.get("/", CoursesController.getAllCourses);
router.get('/new', CoursesController.getFormForCreatingCourse)
router.post('/', courseMiddleware.courseValidate, CoursesController.createCourse);
router.put('/:id', CoursesController.updateCourse);
router.delete('/:id', CoursesController.deleteCourse);

module.exports = router;