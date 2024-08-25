
const express = require('express');
const mongoose = require('mongoose');

// models: 
const User = require('./models/User.js');


// routes
const authRouter = require('./routes/auth.js');

const app = express();

const PORT = 5010;



// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

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


app.use(authRouter)






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

























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