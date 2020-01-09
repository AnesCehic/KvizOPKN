var express = require("express");
var router = express.Router();

var LecturesController = require('../controllers/LecturesController');
var lectureMiddleware = require('../middlewares/LectureMiddleware');

router.get("/:id/lectures/", LecturesController.getAllLectures);
router.get('/:id/lectures/new', LecturesController.getFormForAddingLecture);
router.post('/:id/lectures/', lectureMiddleware.validateLecture, LecturesController.addLecture);
router.get('/:id/lectures/:idPred/update', LecturesController.getFormForUpdateLecture);
router.put('/:id/lectures/:idPred', lectureMiddleware.validateLecture, LecturesController.updateLecture)
router.delete('/lectures/:id', LecturesController.deleteLecture);

module.exports = router;