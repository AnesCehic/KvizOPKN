var express = require("express");
var router = express.Router();

var QuestionnairesController = require('../controllers/QuestionnaireController');

router.get('/:id/questionnaires', QuestionnairesController.listOfQuestionnaires)
router.post('/:id/questionnaire', QuestionnairesController.addQuestionnaire);
router.put('/:id/questionnaire/:qId', QuestionnairesController.updateQuestionnaire);
router.delete('/:id/questionnaire/:qId', QuestionnairesController.deleteQuestionnaire)

module.exports = router;