const { post } = require('../../database');

const getPost = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    posts = await post.findAll({
      attributes: ['id', 'title', 'image', 'categoryId', 'createdAt'],
      order: [['title', 'desc']],
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
      res.json({ message: 'post does not exists' });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await post.create(req.body);
    res.json(newPost);
  } catch (error) {
    console.error(error);
  }
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
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
