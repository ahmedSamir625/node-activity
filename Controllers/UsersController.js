const User = require("../Models/User");
const Product = require("../Models/Product");
const { setResponseBody } = require("../Helpers/responseBody");

const getUser = (req, res) => {
  const { userId } = req.body;

  User.findOne({ _id: userId }, (err, results) => {
    res.json(setResponseBody(err, results));
  });
};

const getUserCart = (req, res) => {
  const { cart } = req.body;

  Product.find({ _id: { $in: Object.values(cart) } }, (err, results) => {
    res.json(setResponseBody(err, results));
  });
};

const addToCart = (req, res) => {
  const { userId, productId } = req.body;

  const cartItem = {
    productId,
    amount: 1,
  };

  User.findByIdAndUpdate(
    { _id: userId },
    { $push: { cart: cartItem } },
    { new: true },
    (err, results) => {
      res.json(setResponseBody(err, results));
    }
  );
};

const removeItemFromCart = (req, res) => {
  const { userId, productId } = req.body;

  User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { cart: { productId: productId } } },
    { multi: true, new: true },
    (err, results) => {
      res.json(setResponseBody(err, results));
    }
  );
};

const incrementUserProductAmount = (req, res) => {
  const { userId, productId } = req.body;

  User.findOneAndUpdate(
    { _id: userId, "cart.productId": productId },
    { $inc: { "cart.$.amount": 1 } },
    { new: true },
    (err, results) => {
      res.json(setResponseBody(err, results));
    }
  );
};

const decrementUserProductAmount = (req, res) => {
  const { userId, productId } = req.body;

  User.findOneAndUpdate(
    { _id: userId, "cart.productId": productId },
    { $inc: { "cart.$.amount": -1 } },
    { new: true },
    (err, results) => {
      res.json(setResponseBody(err, results));
    }
  );
};


module.exports = {
  addToCart: addToCart,
  getUserCart: getUserCart,
  incrementUserProductAmount: incrementUserProductAmount,
  decrementUserProductAmount: decrementUserProductAmount,
  removeItemFromCart: removeItemFromCart,
  getUser: getUser,
};
