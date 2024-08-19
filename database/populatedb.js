require('dotenv').config();

const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    numberInStock INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  INSERT INTO categories (name, description)
  VALUES
    ('Beverages', 'A liquid for human consumption'),
    ('Bakery', 'Flour-based baked goods made in an oven such as bread, cookies, cakes'),
    ('Dairy', 'Milk and products made from milk'),
    ('Meat', 'The flesh or other edible parts of animals (usually domesticated cattle, swine, and sheep) used for food, including not only the muscles and fat but also the tendons and ligaments');

  INSERT INTO items (name, description, category_id, price, numberInStock)
  VALUES
    ('Coca Cola 2l', 'A carbonated soft drink with a cola flavor manufactured by the Coca-Cola Company', (SELECT id FROM categories WHERE name = 'Beverages'), 2.89, 24),
    ('Guarana 2L', 'A very popular effervescent drink originated in Brazil. Created from the extract of the guaraná plant, native to the Amazon region, this drink has a unique and invigorating flavor', (SELECT id FROM categories WHERE name = 'Beverages'), 2.59, 16),
    ('Sliced Bread', 'A loaf of bread that has been sliced with a machine and packaged for convenience', (SELECT id FROM categories WHERE name = 'Bakery'), 3.14, 18),
    ('Chocolate Cake', 'A cake flavored with melted chocolate. Sweet and savory', (SELECT id FROM categories WHERE name = 'Bakery'), 11.59, 3),
    ('Milk 1L', 'An opaque white fluid rich in fat and protein, secreted by cows', (SELECT id FROM categories WHERE name = 'Dairy'), 1.79, 36),
    ('Mussarela Cheese 150g', 'A dairy product produced from cow milk', (SELECT id FROM categories WHERE name = 'Dairy'), 3.19, 13),
    ('Beef Minced Meat 500g', 'Beef that has been finely chopped with a knife or meat grinder', (SELECT id FROM categories WHERE name = 'Meat'), 6.19, 9),
    ('Meatballs 275g', 'Ground meat (mince) rolled into a ball, sometimes along with other ingredients, such as bread crumbs, minced onion, eggs, butter, and seasoning', (SELECT id FROM categories WHERE name = 'Meat'), 9.29, 17);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
