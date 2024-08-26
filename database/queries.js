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

async function createCategory(obj) {
  const { name, description } = obj;

  await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2)', [name, description]);

  await pool.query(`UPDATE categories SET url = CONCAT('/inventory/categories/', categories.id) WHERE name = $1`, [name]);
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

  await pool.query('INSERT INTO items (name, description, category_id, price, numberInStock) VALUES ($1, $2, $3, $4, $5)', [name, description, category_id, price, number_in_stock]);

  await pool.query(`UPDATE items SET url = CONCAT('/inventory/items/', items.id) WHERE name = $1`, [name]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  getAllItems,
  getItemById,
  createItem,
}
