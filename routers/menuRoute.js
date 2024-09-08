const express = require('express');
const router = express.Router();
const getMenu = require('../controllers/menu-controller');

router.route('/menu').get(getMenu);

module.exports = router;