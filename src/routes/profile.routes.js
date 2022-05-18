const {Router} = require('express');
const router = Router();
const controller = require('../controllers/profile.controller');
const {isLogged} = require('../controllers/verifySession');

router.post('/sessionLogin', controller.sessionLogin)
router.get('/profile', isLogged,controller.profile);
router.get('/sessionLogOut', controller.sessionLogOut)

module.exports = router;