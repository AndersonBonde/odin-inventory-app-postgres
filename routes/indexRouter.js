const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.redirect('/categories');
});

module.exports = indexRouter;
