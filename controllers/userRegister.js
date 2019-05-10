const user = require('../database/models/user')

module.exports = (req, res) => {
    user.create(
        req.body, (error, user) => {
            // console.log(error);
            if (error) {
                res.redirect('/user/create')
            }
            res.redirect('/')
        }
    )
}