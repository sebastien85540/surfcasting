const path = require('path')
    , post = require('../database/models/article')
module.exports = (req, res) => {
    // console.log(req.files);
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);
    image.mv(uploadFile, (error) => {
        post.create({
            ...req.body,
            image: `/articles/${image.name}`
        },
            (error, post) => {
                res.redirect("/")
            })
        // console.log(req.body);

    })

}