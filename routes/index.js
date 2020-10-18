var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index');

/* GET home page. */
router.get('/', IndexController.getList);
router.post('/add', IndexController.add);

module.exports = router;
