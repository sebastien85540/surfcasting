const bcrypt = require('bcrypt')
    , mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'le nom est obligatoire']
    },
    surname: {
        type: String,
        required: [true, 'le prenom est obligatoire']
    },
    userName: {
        type: String,
        required: [true, "le nom d'utilisateur est obligatoire"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "l'email est obligatoire"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'le mot de passe est obligatoire']
    },
    // terms: {
    //     type: String,
    //     required: [true, 'les conditions sont obligatoires']
    // },
})
userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})
module.exports = mongoose.model('user', userSchema)