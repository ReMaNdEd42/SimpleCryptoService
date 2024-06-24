const express = require('express');
const router = express.Router();

const fileAccessController = require('../controllers/fileAccess.controller')

router.get('/:file', fileAccessController.getKey);

module.exports = router;
