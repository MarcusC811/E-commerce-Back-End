const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const data = await Category.findAll({
    include: [{model: Product}],
  });
  if(!data) {
    res.status(404).json({message: 'No Category data found'})
  }
  res.status(200).json(data)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // find one?? 
  const data = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  if(!data) {
    res.status(404).json({message: 'No data with that id'})
  }
  res.status(200).json(data)
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
