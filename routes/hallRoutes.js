const express = require('express');
const hallController = require('../controllers/hallController');

const router = express.Router();

router
  .route('/')
  .get(hallController.getAllHalls)
  .post(hallController.createHall);

router
  .route('/:id')
  .get(hallController.getHall)
  .patch(hallController.updateHall)
  .delete(hallController.deleteHall);

module.exports = router;
