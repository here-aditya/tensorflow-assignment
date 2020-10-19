var express = require('express');
var router = express.Router();

// Require controller modules.
var user_ctrl = require('../controllers/user_controller');

/* Show users listing. */
router.all('/', user_ctrl.index);
router.get('/fetchlist', user_ctrl.fetchUserList);
router.post('/update/:id', user_ctrl.updateUser);
router.all('/csvdownload', user_ctrl.downloadAsCSV);

module.exports = router;