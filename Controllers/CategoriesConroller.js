const Category = require("../Models/Category");
const { setResponseBody } = require("../Helpers/responseBody");

const getCategories = (_, res) => {
  Category.find({}, { _id: 1, name: 1 }, (err, results) => {
    res.json(setResponseBody(err, results));
  });
};

const addCategory = (req, res) => {
  let category = new Category(req.body);
  category.save((err, results) => {
    res.json(setResponseBody(err, results));
  });
};

module.exports = {
  getCategories: getCategories,
  addCategory: addCategory,
};
