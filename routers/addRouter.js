const router = require('express').Router();
const controller = require('../controllers/addController');

router.get('', controller.getAddPage);
router.post('', controller.addContact);

module.exports = router;