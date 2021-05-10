const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true,
    },

    date: {
        type: String,
    },

    postTitle: {
        type: String,
        required: true,
    },

    content: {
        type: String
    },

    authorImgUrl: {
        type: String
    },

    authorId: {
        type: String
    }

})

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);