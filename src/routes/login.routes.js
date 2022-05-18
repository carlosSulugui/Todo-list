const {Router} = require('express');
const router = Router();
const controller = require('../controllers/login.controller');
const {isUnlogged} = require('../controllers/verifySession');

router.get('/login',isUnlogged, controller.index);

module.exports = router;