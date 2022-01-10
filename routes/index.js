const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const delhiController = require('../controllers/delhi_controller');
router.get('/',homeController.home);
router.post('/new-partner',homeController.createOrg);
router.get('/wip',homeController.wip);
router.get('/hospital-details',delhiController.delhiScraper);
module.exports = router;