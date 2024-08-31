// const express = require("express");

// const User = require("../models/User.js");

// const { v4: uuidv4 } = require('uuid');

// const authRouter = express.Router();

// const isLoggedIn = require("../middlewares/isLoggedIn.js");

// const bcrypt = require('bcrypt');
// const saltRounds = 12;

// const  letsMail = require("../utilities/letsMail.js");

 

// authRouter.post("/signup", async (req, res) => {
     
//     const {name,email, password} = req.body; 

//     // validation: 

//     if(!name || !email || !password){
//         return res.json({message: "Please fill all the fields"});
//     }
//     let hashedPassword = await bcrypt.hash(password, saltRounds);
//     let newUser = new User({
//         name: name,
//         email: email,
//         password: hashedPassword
//     })        
// try{
//     let savedUser = await newUser.save() // 2secs
//     if(savedUser==null){
//         return res.json({message: "Error saving user"});
//     }
//     else{

        
//          savedUser.token = uuidv4();
//         let updatedUser = await savedUser.save();
//         if(updatedUser == null){
//             return res.json({message: "Error saving token"});
//         }
//         else{
//             return res.json({message: "User created successfully", user: savedUser});
//         }
//     }
// }
// catch(err){
//     console.log("Error creating user", err);
// }

// })


// authRouter.post("/login", async (req, res) => {
//     const {email, password} = req.body; 
     
//      if(!email || !password){
//         return res.json({message: "Please fill all the fields"});
//     }
//     try{
//         let foundUser = await User.findOne({email: email});
//        const isSame  =  await bcrypt.compare(password, foundUser.password)
//        if(isSame){
//             foundUser.token = uuidv4();
//             let updatedUser = await foundUser.save();
//            if(updatedUser == null){
//                return res.json({message: "Error saving token"});
//            }
//            else{
//                return res.json({message: "User logged in successfully", user: updatedUser

//                });
//            }
//        }
//        else{
//               return res.json({message: "Invalid password"});
             
//             }
//         }
    
//     catch(err){
//         console.log("Error finding user", err);
//     }
// })




// module.exports = authRouter;



// // middleware



// // .then and catch alternativ= > async and await



// // encryption and decryption

// // "hello" => "defhaeriubgeiurbgeurbgiu"

// // hello

// // hashing

// // "hello" => "defhaeriubgeiurbgeurbgiu"

// // hello => "defhaeriubgeiurbgeurbgiu"






// // Email : 

// // configurtion 
// // sending email => text, html , attachments , template => dynamic data