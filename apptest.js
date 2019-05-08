const mongoose = require('mongoose')

const article = require('./database/models/article')

mongoose.connect('mongodb://localhost:27017/blog-test', {useNewUrlParser: true});

article.findByIdAndUpdate("5cd2c8b01367687835aed912",{
    intro: "c'est un beau film d'action"
}, (error, post) => {
    console.log(error, post);
    
})

// article.findById("5cd2c8b01367687835aed912", (error, articles) => {
//     console.log(error, articles);
    
// })

// article.find({}, (error, articles) => {
//     console.log(error, articles);
    
// })
// article.create({
//     title : "Spiderman",
//     intro: "action +++",
//     content: "il faut aller le voir",

// }, (error, post) => {
//     console.log(error, post);
    
// })