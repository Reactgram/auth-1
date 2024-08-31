const express = require("express");

const User = require("../models/User.js");

const { v4: uuidv4 } = require('uuid');

const authRouter = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn.js");

const bcrypt = require('bcrypt');
const saltRounds = 12;

// const  letsMail = require("../utilities/letsMail.js");
const sendMail = require("../utilities/sendMail.js");

// import env
const dotenv = require("dotenv");
dotenv.config();

let web_url = process.env.website;

 

authRouter.post("/signup", async (req, res) => {
     
    const {name,email, password} = req.body; 

    // validation: 

    if(!name || !email || !password){
        return res.json({message: "Please fill all the fields"});
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    })        
try{
    let savedUser = await newUser.save() // 2secs
    
    if(savedUser!=null){
          savedUser.emailToken = uuidv4();
          let updatedUser = await savedUser.save();

          if(updatedUser == null){
              return res.json({message: "Error saving email token"});
          }

          else{
                // let Welcome and send veriiication email:
                sendMail({
                    to: updatedUser.email,
                    subject: "Welcome to our app",
                    name: updatedUser.name,
                    link: `${web_url}/verifyEmail/${updatedUser.emailToken}`
                })

            return res.json({message: "User created successfully and Mail Sent", user: updatedUser});
          }

        
    }
    
    return res.json({message: "Error saving user"});

}
catch(err){
    console.log("Error creating user", err);
}

})


authRouter.post("/login", async (req, res) => {
    const {email, password} = req.body; 
     
     if(!email || !password){
        return res.json({message: "Please fill all the fields"});
    }
    try{
        let foundUser = await User.findOne({email: email});
       const isSame  =  await bcrypt.compare(password, foundUser.password)
       if(isSame){
            foundUser.token = uuidv4();
            let updatedUser = await foundUser.save();
           if(updatedUser == null){
               return res.json({message: "Error saving token"});
           }
           else{
               return res.json({message: "User logged in successfully", user: updatedUser

               });
           }
       }
       else{
              return res.json({message: "Invalid password"});
             
            }
        }
    
    catch(err){
        console.log("Error finding user", err);
    }
})



authRouter.get("/verifyEmail/:emailToken", async (req, res) => {

    let emailToken = req.params.emailToken;

    if(!emailToken){
        return res.json({message: "Invalid token"});
    }
    

    try{
        let foundUser = await User.findOne({emailToken: emailToken});
        if(foundUser == null){
            return res.json({message: "Invalid token"});
        }
        else{
              let token = uuidv4();

              foundUser.emailToken = "";
             foundUser.emailVerified = true;
             foundUser.token = token;

           let updatedUser = await foundUser.save();

              if(updatedUser == null){
                return res.json({message: "Error saving user"});
              }
              else{
                return res.json({message: "Email verified successfully", user: updatedUser});
              }
        }
        
    }
    catch(err){
        console.log("Error verifying email", err);
    }


})




module.exports = authRouter;



