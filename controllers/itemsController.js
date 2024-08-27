const { body, validationResult } = require('express-validator');
const db = require('../database/queries');

const validateItem = [
  body('name').trim()
    .isLength({ min: 1 }).withMessage('Item must have a name.'),
  body('description').trim()
    .isLength({ min: 10 }).withMessage('Item description length must be at least 10 characters.'),
  body('category_id')
    .isLength({ min: 1 }).withMessage('Please select a category.'),
  body('price')
    .isLength({ min: 1 }).withMessage('Price must not be empty.'),
  body('numberinstock')
    .isLength({ min: 1 }).withMessage('Number in stock must not be empty.'),
];

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

const itemCreateGet = async (req, res) => {
  const categories = await db.getAllCategories();

  res.render('item_form', {
    title: 'Create a new item',
    categories: categories,
  });
};

const itemCreatePost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const item = Object.assign({}, req.body);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();

      res.render('item_form', {
        title: 'Create a new item',
        item: item,
        categories: categories,
        errors: errors.array(),
      });
    } else {
      await db.createItem(item);

      res.redirect('/');
    }
  },
];

const itemUpdateGet = async (req, res) => {
  const item = await db.getItemById(req.params.id);
  const categories = await db.getAllCategories();

  res.render('item_form', {
    title: 'Update item',
    categories: categories,
    item: item,
  });
};

const itemUpdatePost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const item = Object.assign({ id: req.params.id }, req.body);

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();

      res.render('item_form', {
        title: 'Update item',
        categories: categories,
        item: item,
        errors: errors.array(),
      });
    } else {
      const updated = await db.updateItem(item.id, item);

      res.redirect(updated.url);
    }
  }
];

module.exports = {
  itemsListGet,
  itemDetailGet,
  itemCreateGet,
  itemCreatePost,
  itemUpdateGet,
  itemUpdatePost,
}
