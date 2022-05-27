const {Router} = require('express');
const router = Router();
const controller = require('../controllers/sessionLogin.controller');

router.post('/sessionLogin', controller.sessionLogin);
router.get('/sessionLogOut', controller.sessionLogOut);

module.exports = router;