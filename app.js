const express = require('express')
    , exphbs = require('express-handlebars')
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , fileupload = require('express-fileupload')
    , expressSession = require('express-session');

// CONTROLLER
// Article
const articleSingleController = require('./controllers/articleSingle')
    , createArticleController = require('./controllers/articleAdd')
    , articlePostController = require('./controllers/articlePost')
    , homePage = require('./controllers/homePage')
// User
const userCreate = require('./controllers/userCreate')
    , userRegister = require('./controllers/userRegister')
    , userLogin = require('./controllers/userLogin')
    , userLoginAuth = require('./controllers/userLoginAuth')
const app = express();

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileupload())

mongoose.connect('mongodb://localhost:27017/surfcasting', { useNewUrlParser: true });

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


app.use(express.static('public'));
//  ROUTE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// MIDDLEWARE
const articleValidPost = require('./middleware/articleValidPost')

app.use("/articles/post", articleValidPost)
// GET
app.get('/', homePage)
app.get('/contact', (req, res) => {
    res.render("contact")
})

// ARTICLES
app.get("/articles/add", createArticleController)
app.get("/articles/:id", articleSingleController)
app.post("/articles/post", articlePostController)
// Users
app.get('/user/create', userCreate)
app.post('/user/register', userRegister)
app.get('/user/login', userLogin)
app.post('/user/loginAuth', userLoginAuth)


app.listen(3000, () => {
    console.log("server started on port 3000");

})