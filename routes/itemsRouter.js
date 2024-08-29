const { Router } = require('express');
const itemsRouter = Router();
const itemsController = require('../controllers/itemsController');

itemsRouter.get('/', itemsController.itemsListGet);
itemsRouter.get('/create', itemsController.itemCreateGet);
itemsRouter.post('/create', itemsController.itemCreatePost);
itemsRouter.get('/:id/update', itemsController.itemUpdateGet);
itemsRouter.post('/:id/update', itemsController.itemUpdatePost);
itemsRouter.get('/:id/delete', itemsController.itemDeleteGet);
itemsRouter.post('/:id/delete', itemsController.itemDeletePost);
itemsRouter.get('/:id', itemsController.itemDetailGet);

module.exports = itemsRouter;
