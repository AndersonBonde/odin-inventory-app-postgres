const { Router } = require('express');
const itemsRouter = Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.get('/', itemsController.itemsListGet);

module.exports = itemsRouter;
