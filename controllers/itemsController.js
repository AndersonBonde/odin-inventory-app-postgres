const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const index = async (req, res) => {
  const items = await db.getAllItems();

  res.render('itemsIndex', {
    title: 'All items',
    items: items,
  });
};

module.exports = {
  index,

}
