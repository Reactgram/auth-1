
const express = require('express');
const mongoose = require('mongoose');

// models: 
const User = require('./models/User.js');

const Post = require('./models/Post.js');





// routes
// const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/User.js');

const postRouter = require('./routes/post.js');

const app = express();

const PORT = 5010;



// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

// middleware: 

function customMiddleware(req, res, next){
    // console.log("AuthRouter is running");
    // console.log("body",req.body);
    // console.log("params",req.params);
    // console.log("query",req.query);
    // console.log("headers",req.headers);
    // console.log("url",req.url);
    // console.log("method",req.method);
    console.log("Url of Api hit is", req.url);
    next();
}

// connecting to the database

mongoose.connect("mongodb+srv://auth:xf5RTGmZ8GGzIzLD@auth1-rectgram.apmhd.mongodb.net/")
.then(
    () => {
        console.log("Connected to the database");
    }
)
.catch(err => {
    console.log("Error connecting to the database", err);
})


// middleware
app.use(express.json());

app.use(customMiddleware);
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)







app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})













// env => environment variables










// Signup and Login => (email and password)

// Dashboard page, where your name is displayed

// Zuku message => oly to logged in user



// email verify => email (otp to verify email)
// forget password => email (link to reset password)
// validations (model level, logic level)

// use the controllers



// auth

// xf5RTGmZ8GGzIzLD
// mongodb+srv://auth:xf5RTGmZ8GGzIzLD@auth1-rectgram.apmhd.mongodb.net/




// send SMS  => AWS
// upload image => AWS S3 , cloudinary

// validations: (model level, logic level)

// JWT => token => verify => user

// Passport.js => authecation => social media login

// payments => razorpay