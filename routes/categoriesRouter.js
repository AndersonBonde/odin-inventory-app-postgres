const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.categoriesListGet);
categoriesRouter.get('/create', categoriesController.categoryCreateGet);
categoriesRouter.post('/create', categoriesController.categoryCreatePost);
categoriesRouter.get('/:id/update', categoriesController.categoryUpdateGet);
categoriesRouter.post('/:id/update', categoriesController.categoryUpdatePost);
categoriesRouter.get('/:id/delete', categoriesController.categoryDeleteGet);
categoriesRouter.post('/:id/delete', categoriesController.categoryDeletePost);
categoriesRouter.get('/:id', categoriesController.categoryDetailGet);

module.exports = categoriesRouter;
