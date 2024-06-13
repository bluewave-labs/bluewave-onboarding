const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const databaseConfig = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: 'postgres',
    port: process.env.DEV_DB_PORT,
    logging: false // Disable logging in development mode
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: 'postgres',
    port: process.env.TEST_DB_PORT,
    logging: false // Disable logging in test mode
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: 'postgres',
    port: process.env.PROD_DB_PORT,
    logging: false // Disable logging in production mode
  }
};

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(databaseConfig[env]);

module.exports = sequelize;