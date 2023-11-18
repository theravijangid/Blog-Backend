const Post = require("../models/post");
const Like = require("../models/likem");

exports.likepost = async(req,res) => {
    try{
        //fetch data from req body
        const {post, user} = req.body;
        ////create a comment object
        const like = new Like({
            post, user,
        });

        //save the comment into the database
        const savedLike = await like.save(); 

        //find the post by ID, add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}} , {new: true})
                            .populate("likes")
                            .exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return res.status(500).json({
            error:"error while liking post",
        });
    }

}



//UNLIKE 
exports.unlikepost = async(req,res) => {
    try{
        const {post, like} = req.body;
        //find and delete the like collection
        const deleteLike = await Like.findOneAndDelete({post:post, _id:like}); 

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deleteLike._id}} , {new: true}); 
                            // .populate("likes")
                            // .exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error) {
        return res.status(500).json({
            error:"error while unliking post",
        });
    }

}