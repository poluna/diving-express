const Application = require("../models/application");

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
      phone: req.body.phone,
      message: req.body.message,
    });
    req.flash("form", req.body.first_name + ", you are a true hero!");
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

// Middleware
exports.normalizeData = (req, res, next) => {
  const nameArr = req.body.name.split(" ");

  req.body.first_name = nameArr.shift();
  req.body.last_name = nameArr.join(" ");

  next();
};
