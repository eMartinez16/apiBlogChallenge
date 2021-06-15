require('./database');

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/post');

app.get('api/post/{id}');
app.post('/api/post)');

app.patch('api/post/{id}');

app.delete('api/post/{id}');

app.listen(port, () => {
  console.log(`CoNENCTEd`);
});
