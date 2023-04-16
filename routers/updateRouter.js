const router = require('express').Router();
const controller = require('../controllers/updateController');

router.get('', controller.getUpdPage);
router.post('', controller.updateContact);

module.exports = router;
