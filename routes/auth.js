const express = require("express");

const User = require("../models/User.js");

const { v4: uuidv4 } = require('uuid');

const authRouter = express.Router();




authRouter.post("/signup", (req, res) => {
      const {name,email, password} = req.body; // {name: "John", email: "john@gmail", password: "1234"}

       
      const newUser  = new User({
            name: name,
            email: email,
            password: password
      })

      newUser.save()
      .then(() => {
            res.json({message: "User created successfully", user: newUser});
      })
    .catch(err => {
            console.log("Error creating user", err);
    })

})


authRouter.post("/login", (req, res) => {
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


authRouter.get("/secret1", (req, res) => {
    res.json({message: "Name of Raw agaent is Mohit Rawat"});
})


authRouter.get("/secret2", (req, res) => {
    let token = req.headers.authorization;

    if(token == null){
        return res.json({message: "User not found"});
    }
     
    User.findOne({token: token})
    .then(foundUser =>{
        if(foundUser == null){
            return res.json({message: "User not found"});
        }
        else{
            return res.json({message: "Name of Raw agaent is Mohit Rawat", user: foundUser});
    }
    })
    .catch(
        err=>{
            console.log("Error finding user", err);
        }
    )



    
})



module.exports = authRouter;