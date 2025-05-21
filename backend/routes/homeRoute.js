const router=require('express').Router();
const {home}=require('../controllers/homeController');
router.post('/home',home);
module.exports = router;