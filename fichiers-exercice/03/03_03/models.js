const mongose = require("mongoose");


const PostSchema = mongose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    }
});

PostSchema.methods.toLocalString = function () {
    return this.created_at.toLocaleString();
};

module.exports = mongose.model("Post", PostSchema);