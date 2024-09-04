const express = require('express');
const postRouter = express.Router
();
const isLoggedIn = require('../middlewares/isLoggedIn.js');

const Post = require('../models/Post.js');


const customResponse = require("../utilities/response.js");



postRouter.get("/create",isLoggedIn, async (req, res) => {
      let user = req.user;

      let {text, img_link} = req.body;

      if(!text && !img_link){
          return customResponse(res, "Please provide text or img_link", null, 400, false);
      }

      try{
            const newPost = new Post({
                text: text,
                img_link: img_link,
                user_id: user._id // diff way
            })
    
           let savedPost =  newPost.save()
           if(savedPost == null){
               return  customResponse(res, "Error creating post", null, 400, false);     
            }
            return customResponse(res, "Post created successfully", savedPost, 200, true);
    }

      catch(err){
          console.log("Error creating post", err);
      }
})


module.exports = postRouter;