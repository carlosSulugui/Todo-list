const {Router} = require('express');
const router = Router();
const controller = require('../controllers/profile.controller');
const {isLogged} = require('../controllers/verifySession');


router.get('/profile', isLogged,controller.profile);
router.post('/addTask', isLogged, controller.addTask);


module.exports = router;