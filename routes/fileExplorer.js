const express = require('express');
const router = express.Router();

const fileExplorerController = require('../controllers/fileExplorer.controller')

router.get('/:file', fileExplorerController.getFile);

module.exports = router;