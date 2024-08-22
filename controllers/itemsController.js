const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const itemsListGet = async (req, res) => {
  const items = await db.getAllItems();

  res.render('items', {
    title: 'Items',
    items: items,
  });
};

const itemDetailGet = async (req, res) => {
  const item = await db.getItemById(req.params.id);

  res.render('item_detail', {
    title: 'Item detail',
    item: item,
  });
};

module.exports = {
  itemsListGet,
  itemDetailGet,
}
