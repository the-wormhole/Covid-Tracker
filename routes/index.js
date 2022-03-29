const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const delhiController = require('../controllers/delhi_controller');
const orgController = require('../controllers/org_controller');
const searchController = require('../controllers/search_controller');

router.get('/',homeController.home);
router.post('/new-partner',orgController.createOrg);
router.get('/wip',homeController.wip);
router.get('/hospital-details',delhiController.delhiScraper);
router.get('/organisations-list',orgController.orgList);
router.get('/search',searchController.search);
module.exports = router;