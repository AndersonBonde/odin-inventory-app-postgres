const pool = require('./pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');

  return rows;
};

async function getAllItems() {
  const { rows } = await pool.query('SELECT * FROM items');

  return rows;
};

module.exports = {
  getAllCategories,
  getAllItems,

}
