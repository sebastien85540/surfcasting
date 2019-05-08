const mongoose = require('mongoose')

const articleShema = new mongoose.Schema({
    title : String,
    content: String,

})
const article = mongoose.model('article', articleShema)

module.exports = article