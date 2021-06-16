require('./database');
const postController = require('./src/controllers/postController');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Get all posts
app.get('/api/post', postController.getPost);

//get posts by id
app.get('api/post/:id', postController.getPostById);

//create new post
app.post('/api/post, ', postController.createPost);

//update post
app.patch('api/post/:id', postController.updatePost);

//delete post
app.delete('api/post/:id', postController.deletePost);

app.listen(port, () => {
  console.log(`Connected`);
});
