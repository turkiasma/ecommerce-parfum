const express = require("express");
const bagRouter = express.Router();
const isAuth = require("../middleware/isAuth");
const isAutho = require("../middleware/isAutho");
const { addToBag,updateQuantity,deleteItemFromBag,viewBag,confirmBag } = require('../Controllers/bagController');

// Use "/add" route, but now it's accessible at "/api/bag/add"
bagRouter.post('/add', isAuth, isAutho(['user']), addToBag);
bagRouter.post('/updateQuantity', isAuth, isAutho(['user']), updateQuantity);
bagRouter.get('/view', isAuth, isAutho(['user']), viewBag);
bagRouter.delete('/deleteItem/:productId', isAuth, isAutho(['user']), deleteItemFromBag); // Added route param
bagRouter.post('/confirmBag', isAuth, isAutho(['user']), confirmBag);

module.exports = bagRouter;