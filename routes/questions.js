var express = require('express');
var router = express.Router();

var questionsController = require('../controllers/QuestionsController');

router.get('/', questionsController.getAllQuestions);
router.post('/', questionsController.addQuestion);
router.get('/:idQuestion', questionsController.getAnswersForQuestion);
router.post('/:idQuestion', questionsController.addAnswerForQuestion);

module.exports = router;