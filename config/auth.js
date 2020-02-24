module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "This page is restricted to member. Please log in.");
        res.redirect("/user/login");
    }
}