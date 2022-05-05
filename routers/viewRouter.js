const router = require('express').Router();
const viewController = require('../controllers/viewController');

router.get('/login', viewController.getLogin);
router.get('/', viewController.getIndex);
module.exports = router;
