const mongoose = require('mongoose')

const articleShema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})
const article = mongoose.model('article', articleShema)

module.exports = article