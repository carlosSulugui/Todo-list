const {Router} = require('express');
const path = require('path');
const router = Router();
const controller = require(path.join(__dirname, '../controllers/login.controller'));


router.get('/login', controller.index);

module.exports = router;