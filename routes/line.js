var express = require('express');
var router = express.Router();

const line = require('@line/bot-sdk');
const configs = require('../configs');
const linecontroller = require('../Controllers/linecontroller')


/* GET home page. */
router.post('/webhook',line.middleware(configs.lineconfig), linecontroller.webhook)

module.exports = router;
