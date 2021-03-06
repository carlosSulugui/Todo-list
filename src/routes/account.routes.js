const {Router} = require('express');
const router = Router();
const controller = require('../controllers/account.controller');
const {isUnlogged} = require('../controllers/verifySession');

router.get('/account',isUnlogged, controller.index);

module.exports = router;