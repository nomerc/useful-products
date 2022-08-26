const Sequelize = require("sequelize");
const db = require("../config/database");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  proteins: {
    type: Sequelize.DOUBLE,
  },
  fats: {
    type: Sequelize.DOUBLE,
  },
  carbohydrates: {
    type: Sequelize.DOUBLE,
  },
  calories: {
    type: Sequelize.DOUBLE,
  },
  description: {
    type: Sequelize.STRING,
  },
});

Product.sync().then(() => {
  // console.log("table created");
});

module.exports = Product;
