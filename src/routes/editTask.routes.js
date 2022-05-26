const {Router} = require('express');
const router = Router();
const controller = require('../controllers/editTask.controller');
const {isLogged} = require('../controllers/verifySession');

router.get('/editTask/:id', isLogged, controller.index);
router.put('/updateTask/:id', isLogged, controller.updateTask);

module.exports = router;