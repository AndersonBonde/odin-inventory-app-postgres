const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const categoriesListGet = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('categories', {
    title: 'Categories',
    categories: categories,
  });
};

const categoryDetailGet = async (req, res) => {
  const { category, items } = await db.getCategoryById(req.params.id);

  res.render('category_detail', {
    title: 'Category detail',
    category: category,
    items: items,
  })
};

module.exports = {
  categoriesListGet,
  categoryDetailGet,
}
