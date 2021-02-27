const express = require('express');
const titleController = require('../controllers/titleController');

const router = express.Router();

router
  .route('/')
  .get(titleController.getAllTitles)
  .post(titleController.createTitle);

router
  .route('/:id')
  .get(titleController.getTitle)
  .patch(titleController.updateTitle)
  .delete(titleController.deleteTitle);

module.exports = router;
