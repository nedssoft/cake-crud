const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cake_dev_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'sqlite',
  },
  test: {
    username: process.env.DB_USER ||  'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cake_test_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'sqlite',
    storage: '.test_db',
  },
  production: {
    username: process.env.DB_USER ||  'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cake_prod_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'sqlite',
    storage: '.prod_db',
  },
};
