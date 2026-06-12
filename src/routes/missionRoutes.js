const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

router.post('/missions', missionController.createMission);
router.get('/missions', missionController.getMissions);
router.get('/missions/:id', missionController.getMissionById);
router.put('/missions/:id', missionController.updateMission);
router.delete('/missions/:id', missionController.deleteMission);

module.exports = router;
