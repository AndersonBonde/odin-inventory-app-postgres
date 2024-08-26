const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.categoriesListGet);
categoriesRouter.get('/create', categoriesController.categoryCreateGet);
categoriesRouter.post('/create', categoriesController.categoryCreatePost);
categoriesRouter.get('/:id', categoriesController.categoryDetailGet);

module.exports = categoriesRouter;
