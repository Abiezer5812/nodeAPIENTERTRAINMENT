const mongose = require("mongoose");
const Post = require("./models/post");


module.exports = {

    // find Post
    async findPosts(req, res) {
        try {
            const posts = await Post.find({});
            res.statut(200).json(posts);
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: e.message });
        }
    },

    // create Post
    async createPost(req, res) {
        try {
            const post = await Post.create(req.body);
            res.status(201).json(post);
            await Post.save();
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: e.message });
        }
    }

}