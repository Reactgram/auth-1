const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
   
    text: {
        type: String,
    },
    
    img_link: {
        type: String,
    },

    user_id: {
        type: String,
    },

    
},
  {
    timestamps: true,
  }

)

const Post = mongoose.model("Post", postSchema);

// export default User;

module.exports = Post;