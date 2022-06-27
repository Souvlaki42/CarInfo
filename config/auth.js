const Cars = require("../models/newCar");

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Please log in to access this page");
        res.redirect("/login");
    },

    ensureNotAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    },

    returnSearch: async function(req, res, next, cars, user, search, errors, no) {

    }
}