const post = require('../database/models/article')

module.exports = async (req, res) => {
    const article = await post.findById(req.params.id)
    res.render('articles', {
        article
    }
        // console.log(req.params);
    )
}