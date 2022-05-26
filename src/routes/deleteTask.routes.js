const {Router} = require('express');
const router = Router();
const controller = require('../controllers/deleteTask.controller');
const {isLogged} = require('../controllers/verifySession');

router.delete('/deleteTask/:id', isLogged, controller.deleteTask);

module.exports = router;