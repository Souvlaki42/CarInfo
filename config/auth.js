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

    generateRandomPhrase: function() {
        let characters = [];
        let random = "";
        const charNumber = 10;

        for (let i = 32; i < 127; i++){
            characters.push( String.fromCharCode(i));
        };

        for (let i = 0; i < charNumber; i++) {
            let newChar = characters[Math.floor(Math.random() * characters.length)];
            random = random + newChar;
        };

        return random;
    }
}