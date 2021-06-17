const { Sequelize, DataTypes } = require('sequelize');
require('dotenv/config');
const postModel = require('./src/models/postModel');
const categoryModel = require('./src/models/categoryModel');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);
const post = postModel(sequelize, DataTypes);
const category = categoryModel(sequelize, DataTypes);

post.belongsTo(category);
category.hasMany(post);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success.');
    sequelize.sync().then(() => {
      //loading data into categories table
      category
        .bulkCreate([
          { name: 'Programming' },
          { name: 'Music' },
          { name: 'Videogames' },
        ])
        .catch(error => console.error(error));
    });
  })
  .catch(error => console.error('Unable to connect to the database:', error));

module.exports = { post, category };
