require('dotenv').config();

const express = require('express');
const app = express();
const path = require('node:path');

const inventoryRouter = require('./routes/inventoryRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const itemsRouter = require('./routes/itemsRouter');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', inventoryRouter);
app.use('/inventory/categories', categoriesRouter);
app.use('/inventory/items', itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
