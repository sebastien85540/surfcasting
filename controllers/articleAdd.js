module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("articles/add")
    }
    res.redirect("/user/login")
}