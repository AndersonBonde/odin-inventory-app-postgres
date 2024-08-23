const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');

  return rows;
};

async function getCategoryById(id) {
  const { rows: category } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  const { rows: items } = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);

  return { category: category[0], items: items };
};

async function getAllItems() {
  const { rows } = await pool.query('SELECT * FROM items');

  return rows;
};

async function getItemById(id) {
  const { rows } = await pool.query('SELECT items.name, items.description, category_id, price, numberInStock, categories.name AS category_name, categories.url AS category_url FROM items INNER JOIN categories ON items.category_id = categories.id WHERE items.id = $1', [id]);

  return rows[0];
}

async function createItem(obj) {
  const { name, description, category_id, price, number_in_stock } = obj;


}

module.exports = {
  getAllCategories,
  getCategoryById,
  getAllItems,
  getItemById,
  createItem,
}
