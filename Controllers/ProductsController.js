const Product = require("../Models/Product");
const {setResponseBody} = require('../Helpers/responseBody')


const getProducts = (req, res) => {
  Product.find(
    {},
    { name: 1, price: 1, amount: 1, images: 1, categories: 1, overallRate: 1 },
    (err, results) => res.json(setResponseBody(err, results))
  );
};

const getProduct = (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, results) =>
    res.json(setResponseBody(err, results))
  );
};

const getCategoryProducts = (req, res) => {
  Product.find({ categories: req.params.id }, (err, results) =>
    res.json(setResponseBody(err, results))
  );
};

const addProduct = (req, res) => {
  const product = new Product(req.body);

  product.save((err, results) => res.json(setResponseBody(err, results)));
};

const editProduct_put = (req, res) => {
  const product = req.body;
  const { name, price, details, categories, amount, imgs } = product;

  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        price,
        details,
        categories,
        amount,
        imgs,
      },
    },
    { new: true },
    (err, results) => res.json(setResponseBody(err, results))
  );
};

const editProduct_patch = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, results) => res.json(setResponseBody(err, results))
  );
};
const deleteProduct = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }, (err, results) => {
    res.json(setResponseBody(err, results));
  });
};

module.exports = {
  getProducts: getProducts,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  getProduct: getProduct,
  editProduct_put: editProduct_put,
  editProduct_patch: editProduct_patch,
  getCategoryProducts: getCategoryProducts,
};
