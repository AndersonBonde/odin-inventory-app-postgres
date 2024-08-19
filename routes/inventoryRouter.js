const { Router } = require('express');
const inventoryRouter = Router();
const inventoryController = require('../controllers/inventoryController');

inventoryRouter.get('/', (req, res) => {
  res.redirect('/inventory');
});

inventoryRouter.get('/inventory', inventoryController.index);

module.exports = inventoryRouter;
