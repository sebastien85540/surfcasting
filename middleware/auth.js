const user = require('../database/models/user')

module.exports = (req, res, next) => {
    // connecte toi a la base de donnee 
    user.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        } else {
            res.redirect('/user/create')
        }
        next()
    })
    //verifie utilisateur

    //si il est dans la base de données

    //sinon redirige le 
}