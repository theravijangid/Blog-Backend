// import model
const post = require("../models/post");

//define route handler

exports.createPost = async(req,res) => {
    try{
        //extract title and description from request body
        const {title, body} = req.body;
        //create a new todo obj and insert in DB
        const response = await post.create({title, body});
        //send a json response with a success flag
        res.status(200).json({
            success:true,
            data:response,
            message:"data created successfully"
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