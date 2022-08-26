const express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  { engine } = require("express-handlebars");

// Database
const db = require("./config/database");

// Test DB
// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log("Error: " + err));

const app = express();

// Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("home", { layout: "landing" }));

// Product routes
app.use("/products", require("./routes/products"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
