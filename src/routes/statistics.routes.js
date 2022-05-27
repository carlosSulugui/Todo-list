const {Router} = require('express');
const router = Router();
const controller = require('../controllers/statistics.controller');
const {isLogged} = require('../controllers/verifySession');

router.get('/statistics', isLogged, controller.index);

module.exports = router;