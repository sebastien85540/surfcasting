const express = require('express')
    , exphbs = require('express-handlebars')
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , fileupload = require("express-fileupload")
    , expressSession = require('express-session')
    , MongoStore = require('connect-mongo')
    , connectFlash = require('connect-flash')
    , {stipTags} = require('./helpers/hbs');

// CONTROLLER
// Article
const articleSingleController = require('./controllers/articleSingle')
    , articleAddController = require('./controllers/articleAdd')
    , articlePostController = require('./controllers/articlePost')
    , homePage = require('./controllers/homePage')
// User
const userCreate = require('./controllers/userCreate')
    , userRegister = require('./controllers/userRegister')
    , userLogin = require('./controllers/userLogin')
    , userLoginAuth = require('./controllers/userLoginAuth')
    , userLogout = require('./controllers/userLogout')
    
const app = express();
mongoose.connect('mongodb://localhost:27017/surfcasting', { useNewUrlParser: true } );


const mongoStore = MongoStore(expressSession)

app.use(connectFlash)

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileupload())

const auth = require('./middleware/auth')
, redirectAuthSuccess = require("./middleware/redirectAuthSuccess")

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


app.use(express.static('public'));

//  ROUTE
app.engine('handlebars', exphbs({
    helpers:{
        stripTags: stipTags
        
    },
    defaultLayout: 'main'
     }));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})

// MIDDLEWARE
const articleValidPost = require('./middleware/articleValidPost')

app.use("/articles/post", articleValidPost)
app.use("/articles/add", auth)

// GET
app.get('/', homePage)


// ARTICLES
app.get("/articles/add", auth, articleAddController)
app.get("/articles/:id", articleSingleController)
app.post("/articles/post", auth, articleValidPost, articlePostController)

// Users
app.get('/user/create', redirectAuthSuccess, userCreate)
app.post('/user/register', redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userLogout)
// CONTACT
app.get('/contact', (req, res) => {
    res.render("contact")
})
// ERREUR 404
app.use((req, res) => {
    res.render('error404')
})
app.listen(3000, () => {
    console.log("server started on port 3000");

})