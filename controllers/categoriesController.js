const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('categories', {
    title: 'Categories',
    categories: categories,
  })
}

module.exports = {
  categoriesListGet,
}
