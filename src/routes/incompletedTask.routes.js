const {Router} = require('express');
const router = Router();
const controller = require('../controllers/incompletedTask.controller');
const {isLogged} = require('../controllers/verifySession');

router.get('/incompletedTask', isLogged, controller.index);

module.exports = router;