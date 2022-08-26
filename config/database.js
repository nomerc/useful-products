const Sequelize = require("sequelize");

require("dotenv").config({ path: "./config/config.env" });

module.exports = new Sequelize(process.env.DATABASE_URL, { logging: false });
