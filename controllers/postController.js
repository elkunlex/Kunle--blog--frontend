// import our post model
const Post = require("../models/Post.js");

//creat new post controller
const createPost = async (req, res) => {
    //extract post data from the body
    //check if all data are available

    //create post document and save
    //send res
    try {
        const { title, content, category, tags } = req.body;
        if (!title || !content || !tags) {
            return res.status(401).json("all field are required");
        }
        //create post object
        const postObj = {
            title,
            content,
            category,
            tags

        }
        const newPost = new Post(postObj);
        const savePost = await newPost.save();
        res.status(201).json({ message: "post created sucesssfully", post: savePost });
   } catch (error) {
        res.status(500).json(error.message);

    } 
};

//fetch all post controller
const fetchAllPost = async (req, res) =>{
    try {
        //Fetch all post from database
        const posts = await Post.find();
        res.status(200).json({message: "All post fetched", data: posts});
    } catch (error) {
        res.status(500).json(error.message);
        
    }
}

//fetch single post
const getSinglePost = async (req,res) => {
    try {
        //extract id from req.params
        const {id} = req.params
        //find the post by id
        const post = await Post.findById (id);
        //check if post not found
        if (!post) return res.status(404).json("sorry post not found");

        //send respons
        res.status(200).json({message:"single post fetch", post:post});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//search post by category
const searchByCategory = async (req, res) => {
    try {
        const {category} = req.params;
        //search for the post
        const posts = await Post.find({category:category});
        //check if no post is found
        if (posts.length < 1) res.status(404).json('no post found');
        res.status(200).json({message:"search sucessfully", data: posts});
    } catch (error) {
        res.status(500).json(error.message)
    }
}

//delete post controller

const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPost = await Post.findByIdAndDelete(id)
        //check if post not found
        if (!deletedPost) return res.status(404).json("post not found and nothing deleted");
        res.status(200).json("post deleted sucessfully");
    } catch (error) {
        res.status(500).json(error.message);
    }
}
// update single post
const updatePost = async (req, res) =>{
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id , req.body,{new:true});
        if(!updatedPost) res.status(404).json("post not found and nothin updated");
        res.status(200).json({message:"post Updated successfully", data: updatedPost});
    } catch (error) {
        res.status(500).json(error.message);
        
    }
}

//export all controller function
module.exports = {createPost, fetchAllPost, getSinglePost, searchByCategory, deletePost, updatePost}