const express = require("express");

const User = require("../models/User.js");

const { v4: uuidv4 } = require('uuid');

const userRouter = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn.js");






userRouter.post("/signup", (req, res) => {
      const {name,email, password} = req.body; // {name: "John", email: "john@gmail", password: "1234"}

    // creating a new user without token
      const newUser  = new User({
            name: name,
            email: email,
            password: password,
            // token : uuidv4()
      })
      // saving the user to the database
      newUser.save()
      .then((savedUser) => {
             savedUser.token = uuidv4();
            savedUser.save()
            .then(updatedUser => {
                 
                res.json({message: "User created successfully", user: savedUser});
            })
            .catch(err => {
                console.log("Error saving token", err);
            })

            
      })
    .catch(err => {
            console.log("Error creating user", err);
    })

})


userRouter.post("/login", (req, res) => {
    const {email, password} = req.body; // {email: "john@gmail", password: "1234"}
    
     User.findOne({email: email})
     .then(foundUser => {
        if(foundUser == null){
            return res.json({message: "User not found"});
        }

        else if(foundUser !=null){
           let savedPassword = foundUser.password;
              if(savedPassword == password){
                foundUser.token = uuidv4();


                foundUser.save()

                .then(savedUser=>{
                    return res.json({message: "User logged in successfully", user: savedUser});
                })

                .catch(
                    err=>{
                        console.log("Error saving token", err);
                    }
                )
            
              }
              else{
                return res.json({message: "Incorrect password"});
              }
        }
       
     })

     .catch(err=> {
        console.log("Error finding user", err);
     })
  
    

})


userRouter.get("/secret1", (req, res) => {
    res.json({message: "Name of Raw agaent is Mohit Rawat"});
})


userRouter.get("/secret2",isLoggedIn,  (req, res) => {
    
    res.json({message: "Name of Raw agaent is Mohit Rawat", data: req.user});
    
})



module.exports = userRouter;



// middleware



// .then and catch alternativ= > async and await