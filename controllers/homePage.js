// POST
const post = require('../database/models/article')

module.exports = async (req, res) => {
    const posts = await post.find({})
    // console.log(posts);
    console.log(req.session);

    res.render("index",
        { posts }
    )
}