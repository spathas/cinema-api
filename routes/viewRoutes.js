const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/movie/:id', viewController.getMovie);

module.exports = router;
