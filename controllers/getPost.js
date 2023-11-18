const post = require("../models/post");

exports.getPost = async(req,res) => {
    try{
        ////fetch all todo items from database
        const posts = await post.find().populate("comments").populate("likes").exec();

        res.status(200).json({
            success:true,
            data:posts,
            message:"data retrive successfull"
        });
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message
        })
    }
}