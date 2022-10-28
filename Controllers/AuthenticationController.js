const Login = require("../Models/Login");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { setResponseBody } = require("../Helpers/responseBody");

const handleRegister = (req, res) => {
  const { email, name, phone, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  const newLogin = new Login({
    email: email,
    hash: hash,
  });

  newLogin.save((err, results) => {
    if (!err) {
      const newUser = new User({
        name: name,
        email: email,
        phone: phone,
        admin: false,
        cart: [],
        orders: [],
      });

      newUser.save((err, results) => {
        if (err) {
          Login.findOneAndDelete({ email: email }, (err, results) => {
            res.json(setResponseBody(err, results));
          });
        }

        res.json(setResponseBody(err, results));
      });
    } else {
      res.json(setResponseBody(err, results));
    }
  });
};

const handleSignin = (req, res) => {
  const { email, password } = req.body;

  Login.findOne({ email: email }, (err, results) => {
    if (!results) {
      res
        .status(400)
        .json(setResponseBody({ message: "Email Not Found!" }, results));
    } else {
      const isValid = bcrypt.compareSync(password, results.hash);
      if (isValid) {
        User.findOne({ email: email }, (err, results) => {
          res.json(setResponseBody(err, results));
        });
      } else {
        res
          .status(400)
          .json(setResponseBody({ message: "Wrong Email or Password" }));
      }
    }
  });
};

module.exports = {
  handleRegister: handleRegister,
  handleSignin: handleSignin,
};
