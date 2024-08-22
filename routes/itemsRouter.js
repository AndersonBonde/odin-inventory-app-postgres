const { Router } = require('express');
const itemsRouter = Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.get('/', itemsController.itemsListGet);
itemsRouter.get('/:id', itemsController.itemDetailGet);

module.exports = itemsRouter;
