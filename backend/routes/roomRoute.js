const router=require('express').Router();
const {createRoom,joinRoom}=require('../controllers/roomController');
router.post('/createroom',createRoom);
router.post('/joinroom',joinRoom);
module.exports = router;