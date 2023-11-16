//import model
const Post = require("../models/post");
const Comment = require("../models/commentModel");

//buiseness logic

exports.createComment = async(req,res) => {
    try{
        //fetch data from req body
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        //save the comment into the database
        const savedComment = await comment.save();

        //find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post , {$push: {comments: savedComment._id} }, {new: true} )
                            .populate("comments") //populate the comments array with commnet documents
                            .exec();
                            
        res.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return res.status(500).json({
            error:"error while creating comment",
        });
    }
}