const bcrypt = require('bcrypt')
    , mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: String,
        required: true
    },
})
userShema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})
module.exports = mongoose.model('user', userShema)