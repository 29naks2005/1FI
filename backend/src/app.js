const express = require("express");
const cors = require("cors");
const productRoutes = require("./features/product/product.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = app;