const express = require("express");
const cors = require("cors");

const recipe = require("./src/recipe");
const product = require("./src/product");

const app = express();
app.use(cors());
app.options("*", cors());
const port = 3000;

app.get("/api/v1/recipes", async (req, res) => {
  const { includedProducts: includedProductsStr } = req.query;
  const includedProducts = includedProductsStr.split(",");
  var result = await recipe.getRecipies(includedProducts);
  res.send(result);
});

app.get("/api/v1/getProductEdaId", async (req, res) => {
  const { term } = req.query;
  const data = await product.getProductId(term);
  res.send(data);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
