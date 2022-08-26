const { where } = require("sequelize");

const express = require("express"),
  router = express.Router(),
  Product = require("../models/Product"),
  Sequelize = require("sequelize"),
  Op = Sequelize.Op;

// Get products
router.get("/", (req, res) =>
  Product.findAll()
    .then((products) =>
      res.render("products", {
        products: products.map((product) => product.toJSON()),
      })
    )
    .catch((err) => res.render("error", { error: err }))
);

// Display add product form
router.get("/add", (req, res) => {
  res.render("add");
});

// Add a product
router.post("/addOrUpdate", (req, res) => {
  let { id, name, proteins, fats, carbohydrates, calories, description } =
    req.body;
  let errors = [];
  // Validate Fields
  if (!name) {
    errors.push({ text: "Please add product name" });
  }
  if (!proteins) {
    errors.push({ text: "Please add protein content" });
  }
  if (!fats) {
    errors.push({ text: "Please add fat content" });
  }
  if (!carbohydrates) {
    errors.push({ text: "Please add carbohydrates content" });
  }
  if (!calories) {
    errors.push({ text: "Please add calories" });
  }
  if (!description) {
    errors.push({ text: "Please add description" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      id,
      name,
      proteins,
      fats,
      carbohydrates,
      calories,
      description,
    });
  } else {
    // Make lowercase and remove space after comma
    name = name.toLowerCase().replace(/,[ ]+/g, ",");
    //UPDATE
    if (id) {
      Product.update(
        { name, proteins, fats, carbohydrates, calories, description },
        { where: { id } }
      )
        .then(() => {
          res.redirect("/products");
        })
        .catch((err) => res.render("error", { error: err.message }));
    }
    //CREATE
    else {
      // Insert into table
      Product.create({
        name,
        proteins,
        fats,
        carbohydrates,
        calories,
        description,
      })
        .then(() => res.redirect("/products"))
        .catch((err) => res.render("error", { error: err.message }));
    }
  }
});

router.post("/edit", (req, res) => {
  Product.findByPk(req.body.id)
    .then((product) =>
      res.render("add", {
        id: product.id,
        name: product.name,
        description: product.description,
        proteins: product.proteins,
        fats: product.fats,
        carbohydrates: product.carbohydrates,
        calories: product.calories,
      })
    )
    .catch((err) => res.render("error", { error: err.message }));
});

//delete product
router.post("/delete", (req, res) => {
  Product.destroy({ where: { id: req.body.id } })
    .then(() => res.redirect("/products"))
    .catch((err) => res.render("error", { error: err.message }));
});

// Search for products
router.get("/search", (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Product.findAll({ where: { name: { [Op.like]: "%" + term + "%" } } })
    .then((products) =>
      res.render("products", {
        products: products.map((product) => product.toJSON()),
      })
    )
    .catch((err) => res.render("error", { error: err }));
});

module.exports = router;
