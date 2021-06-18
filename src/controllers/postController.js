const { post, category } = require('../../database');

const getPost = async (req, res) => {
  try {
    posts = await post.findAll({
      attributes: ['id', 'title', 'image', 'createdAt'],
      order: [['createdAt', 'desc']],
      include: [
        {
          model: category,
          attributes: ['name'],
        },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const posts = await post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!posts) {
      return res.json({ message: 'post does not exists' });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};

const validateUrl = urlImg => {
  if (urlImg.match(/.(jpeg|jpg|gif|png)$/) === null) {
    console.log(urlImg.match(/.(jpeg|jpg|gif|png)$/));
    return false;
  }

  return true;
};

const createPost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json('insert data to create');
    }
    const verifyCategory = await category.findOne({
      where: {
        id: req.body.categoryId,
      },
    });
    if (!verifyCategory) {
      return res.json({ msg: 'category not found' });
    }
    const validateImage = validateUrl(req.body.image);
    console.log(validateImage);
    if (validateImage === false) {
      return res.json('image extension incorrect');
    }

    const newPost = await post.create(req.body);
    res.json(newPost);
  } catch (error) {
    res.json(error);
  }
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const verifyId = await post.findOne({
      where: { id },
    });
    if (!verifyId) {
      return res.json({ msg: 'post not found' });
    }
    await post.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: 'post deleted' });
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const verifyId = await post.findOne({
      where: { id: req.params.id },
    });
    if (!verifyId) {
      return res.json({ msg: 'post not found' });
    }
    if (Object.keys(req.body).length === 0) {
      return res.json('insert data to update');
    }
    const validateImage = validateUrl(req.body.image);
    console.log(validateImage);
    if (validateImage === false) {
      return res.json('image extension incorrect');
    }

    await post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: 'post updated' });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getPost, getPostById, deletePost, updatePost, createPost };
