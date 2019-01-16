var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema =  new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        required: false
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
});

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;
