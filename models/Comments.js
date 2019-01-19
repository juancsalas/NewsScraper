var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema ({

    comment: {
        type: String,
        required: true
    } 
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;