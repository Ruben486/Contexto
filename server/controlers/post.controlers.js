import Post from '../models/post.js'
import { uploadImage, removeImage } from "../libs/cloudinary.js";
import  fsExtra  from "fs-extra";

// todos  adentro de try catch
// asi queda bastante bien
const getPosts = async (req,res) => {
  try {
    const posts = await Post.find()
    return res.send(posts)  
  } catch (error) {
    return  res.status(500).json({"message": error.message})
  }
};

// nuevo posteo
const createPost = async (req,res) => {
  try {
    let image = null;

    const { title,description } = (req.body)
    console.log(req.body)
    console.log(req.files.image)
    if (req.files?.image) {
      console.log(req.files.image)
      const resultado = await uploadImage(req.files.image.tempFilePath)
      image = {
        url: resultado.secure_url,
        public_id: resultado.public_id
      }
      await fsExtra.remove(req.files.image.tempFilePath);
    }
    const newPost = new Post({title,description,image})
    await newPost.save()
    return res.json(newPost)  
  } catch (error) {
    res.status(500).json({"message": error.message })
  }
};
// actualizar
const updatePost = async (req,res) => {
  try {
    const {title,description} = req.body 
    const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.json(post)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

const deletePost = async (req,res) => {
  try {
    const postRemove = await Post.findByIdAndDelete(req.params.id)
    if (!postRemove) return res.status(404).send('not found')
    if (postRemove.image.public_id) {
        await removeImage(postRemove.image.public_id)
    }   
    return res.status(204).send('removing a post')  
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

const getPost = async (req,res) => {
  try {
    const posteo = await Post.findById(req.params.id);
    if (!posteo) return res.status(404)  
    return res.json(posteo)
  } catch (error) {
    res.status(500).json({"message": error.message})
  }
};

export {getPosts,createPost,updatePost,deletePost,getPost}