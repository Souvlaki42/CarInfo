function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) return next();
    req.flash("error_msg", "Please log in to access this page");
    res.redirect("/login");
}

function ensureNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()) return next();
    req.flash("error_msg", "Please log out to access this page");
    res.redirect("/");
}

module.exports = {ensureAuthenticated, ensureNotAuthenticated};