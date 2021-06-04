const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/movie/:id', viewController.getMovie);

router.get('/schedule/:id', viewController.getSchedules);

router.get('/login', viewController.getLoginForm);

module.exports = router;
