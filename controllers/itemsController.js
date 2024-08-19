const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const itemsListGet = async (req, res) => {
  const items = await db.getAllItems();

  res.render('items', {
    title: 'Items',
    items: items,
  });
};

module.exports = {
  itemsListGet,
}
