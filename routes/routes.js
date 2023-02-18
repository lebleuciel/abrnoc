const express = require('express');
const router = express.Router();
const getControllers = require('../controller/getControllers');
const postControllers = require('../controller/postControllers');

router.get('/', getControllers.landing);
router.get('/showSubscriptions', getControllers.showSubscriptions);
router.get('/showInvoices', getControllers.showInvoices);
router.get('/showAllInvoices', getControllers.showAllInvoices);
router.get('/showAllExpences', getControllers.showAllExpences);

router.post('/createUser', postControllers.createUser);
router.post('/addCredit', postControllers.addCredit);
router.post('/newSubscription', postControllers.newSubscription);
router.post('/toggleSubscription', postControllers.toggleSubscription);

module.exports = router;
