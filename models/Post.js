const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    content: {
        type: String,
    },

    category: {
        type: String
    },

    author: {
        type: String
    }

})

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);