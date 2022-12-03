const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const data = await Tag.findAll({
    include: {
      model: Product,
    },
  });
  if(!data) {
    res.status(404).json({message: 'No tags data found'})
  }
  res.status(200).json(data)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const data = await Tag.findByPk(req.params.id, {
    include: Product,
  });
  if(!data) {
    res.status(404).json({message: 'No tag found with that id'})
  }
  res.status(200).json(data)
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
  if(!newTag) {
    res.status(404).json({message: "No tag provided"});
  }
  res.status(200).json(newTag);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const upTag = await Tag.update({tag_name: req.body.tag_name} ,{
    where: {
      id: req.params.id
    }});
  if(!upTag) {
    res.status(404).json({message: 'Invalid tag body provided'});
  }
  res.status(200).json(upTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const delTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  if(!delTag) {
    res.status(404).json({message: 'No ID provided'});
  }
  res.status(200).json(delTag);
});

module.exports = router;
