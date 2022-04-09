const {Router} = require('express');
const path = require('path');
const router = Router();
const controller = require(path.join(__dirname, '../controllers/account.controller'));


router.get('/account', controller.index);

module.exports = router;