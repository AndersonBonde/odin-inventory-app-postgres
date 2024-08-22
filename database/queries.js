const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');

  return rows;
};

async function getAllItems() {
  const { rows } = await pool.query('SELECT * FROM items');

  return rows;
};

async function getItemById(id) {
  const { rows } = await pool.query('SELECT items.name, items.description, category_id, price, numberInStock, categories.name AS category_name FROM items INNER JOIN categories ON items.category_id = categories.id WHERE items.id = $1', [id]);

  return rows[0];
}

module.exports = {
  getAllCategories,
  getAllItems,
  getItemById,
}
