const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  // find all categories
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
  const data = await Category.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  if(!data) {
    res.status(404).json({message: 'No data with that id'})
  }
  res.status(200).json(data)
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(404).json({message: 'Invalid submition'});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const upCat = await Category.update({category_name: req.body.category_name} ,{
    where: {
      id: req.params.id
    }});
  if(!upCat) {
    res.status(404).json({message: 'Invalid ID provided'});
  }
  res.status(200).json(upCat);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const delCat = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  if(!delCat) {
    res.status(404).json({message: 'No ID provided'});
  }
  res.status(200).json(delCat);
});

module.exports = router;
