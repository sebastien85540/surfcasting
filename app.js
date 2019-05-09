const express = require('express')
    , exphbs = require('express-handlebars')
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , fileupload = require('express-fileupload')
    , path = require('path');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileupload())

mongoose.connect('mongodb://localhost:27017/surfcasting', { useNewUrlParser: true });

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
// POST
const post = require('./database/models/article')


app.use(express.static('public'));
//  ROUTE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// GET
app.get('/', async (req, res) => {
    const posts = await post.find({})
    console.log(posts);

    res.render("index",
        { posts }
    )
})
app.get('/contact', (req, res) => {
    res.render("contact")
})

// ARTICLES
app.get("/articles/add", (req, res) => {
    res.render("articles/add")
})
app.get("/articles/:id", async (req, res) => {
    const article = await post.findById(req.params.id)
    res.render('articles', {
        article
    })
    // console.log(req.params);

})
app.post("/articles/post", (req, res) => {
    // console.log(req.files);
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, 'public/articles', image.name);
    image.mv(uploadFile, (error) => {
        post.create(req.body, (error, post) => {
            res.redirect("/")
        })
        // console.log(req.body);

    })

})

app.listen(3000, () => {
    console.log("server started on port 3000");

})