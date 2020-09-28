const Application = require("../models/application");
const { check, validationResult } = require("express-validator/check");

/*
exports.store = (req, res, next) => {
  const application = Application.create({
    name: req.body.name,
    phone: req.body.phone,
    message: req.body.message,
  })
    .then(function () {
      // identyfikator wiadomosci ('form'), a drugi parametr to tresc
      //   req.flash("form", req.body.name.split(" ")[0] + ", you are a true hero!");
      req.flash("form", req.body.first_name + ", you are a true hero!");

      res.redirect("/");
      //   res.json({
      //     name: req.body.name,
      //     phone: req.body.phone,
      //     message: req.body.message,
      //   });
    })
    .catch(function () {
      req.flash("form", "Oops! Something went wrong!");
      res.redirect("/");
    });
  // .catch(next);
};
*/

exports.store = async (req, res, next) => {
  try {
    await Application.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    req.flash("form", req.body.first_name + ", you are a true hero!");
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

exports.validate = [
  check("name").trim().isLength({ min: 1 }).withMessage("Name is required."),
  check("email").isLength({ min: 1 }).withMessage("Email is required."),
  check("message").isLength({ min: 1 }).withMessage("Message is required."),
];

exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body.message);
  if (!errors.isEmpty()) {
    return res.render("home", {
      validated: req.body,
      errors: errors.mapped(),
      showBox: "true", //
    });
  }
  next();
};

// Middleware
exports.normalizeData = (req, res, next) => {
  const nameArr = req.body.name.split(" ");

  req.body.first_name = nameArr.shift();
  req.body.last_name = nameArr.join(" ");

  next();
};
