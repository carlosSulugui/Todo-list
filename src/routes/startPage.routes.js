const {Router} = require('express');
const router = Router();
const controller = require('../controllers/startPage.controller');
const {isUnlogged} = require('../controllers/verifySession');

router.get('/', isUnlogged,controller.index);

module.exports = router;