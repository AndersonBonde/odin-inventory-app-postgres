const db = require('../database/queries');

const index = async (req, res) => {
  const [categories, items] = await Promise.all([
    db.getAllCategories(),
    db.getAllItems()
  ]);

  res.render('index', {
    title: 'Inventory Index',
    categories: categories,
    items: items,
  });
};

module.exports = {
  index,
}
