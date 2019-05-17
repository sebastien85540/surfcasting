const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date()
    }

})
const article = mongoose.model('article', articleSchema)

module.exports = article