const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const validateCategory = [
  body('name').trim()
    .isLength({ min: 1 }).withMessage('Name must not be empty.'),
  body('description').trim()
    .isLength({ min: 10 }).withMessage('Description length must be at least 10 characters.'),
];

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

const categoryCreateGet = async (req, res) => {
  res.render('category_form', {
    title: 'Create a new category',
  });
};

const categoryCreatePost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const category = Object.assign({}, req.body);
    
    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create a new category',
        category: category,
        errors: errors.array(),
      });
    } else {
      await db.createCategory(category);

      res.redirect('/');
    }
  }
];

const categoryUpdateGet = async (req, res) => {
  const { category } = await db.getCategoryById(req.params.id);

  res.render('category_form', {
    title: 'Update category',
    category: category,
  });
};

const categoryUpdatePost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const category = Object.assign({ id: req.params.id }, req.body);

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Update category',
        category: category,
        errors: errors.array(),
      });
    } else {
      const updated = await db.updateCategory(category.id, category);

      res.redirect(updated.url);
    }
  }
];

const categoryDeleteGet = async (req, res) => {
  const { category, items } = await db.getCategoryById(req.params.id);

  res.render('category_delete', {
    title: 'Delete Category',
    category: category,
    items: items,
  })
};

const categoryDeletePost = async (req, res) => {
  await db.deleteCategory(req.params.id);
  
  res.redirect('/');
};

module.exports = {
  categoriesListGet,
  categoryDetailGet,
  categoryCreateGet,
  categoryCreatePost,
  categoryUpdateGet,
  categoryUpdatePost,
  categoryDeleteGet,
  categoryDeletePost,
}
