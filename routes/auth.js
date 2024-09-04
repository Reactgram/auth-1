const express = require('express');
const authRouter = express.Router();

const User = require("../models/User.js");
const { v4: uuidv4 } = require('uuid');
const customResponse = require("../utilities/response.js");
const bcrypt = require('bcrypt');
const saltRounds = 12;
const sendMail = require("../utilities/sendMail.js");
const sendSms = require("../utilities/sendSms.js");
const generateOtp = require("../utilities/generateOtp.js");
// import env
const dotenv = require("dotenv");
dotenv.config();
let web_url = process.env.website;



authRouter.post("/signup", async (req, res) => {
    let {name, email, password, phone} = req.body;

    if(!name || !email || !password || !phone){
        return customResponse(res, "Please provide all the fields")
    }
    // check if name is greater then 3 characters
    // check if email is valid
    // check if password is greater then 6 characters
try{
    let foundUser = await User.findOne({email: email});

    if(foundUser !=null){
        return customResponse(res, "User already exists with this email");
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone
    });

    //    email and phone is unique
    // demo@yandex.com
    let foundUser1 = await User.findOne({email: email});
    if(foundUser1 != null){
        return customResponse(res, "User already exists with this email", null, 400, false);
    }
     // 1111111111
    let foundUser2 = await User({phone: phone});
    if(foundUser2 != null){
        return customResponse(res, "User already exists with this phone", null, 400, false);
    }

     // saving newly created user
    let savedUser = await newUser.save();
    if(savedUser != null){
         let otp = generateOtp();
         // send email verification
         savedUser.emailToken = uuidv4();
         savedUser.email_sent_at = new Date();
         savedUser.otp = otp;
         savedUser.otp_sent_at = new Date();
        const updatedUser = await savedUser.save();

        // send email verification
        sendMail({
            to: updatedUser.email,
            subject: "Welcome to our app",
            name: updatedUser.name,
            link: `${web_url}/verifyEmail/${updatedUser.emailToken}`
        })
        // send otp
        sendSms(`Your Otp is ${updatedUser.otp}`,updatedUser.phone)


        return customResponse(res, "User created successfully and Mail and OTP sent", savedUser, 200, true);
    }
}
catch(err){
    return customResponse(res, "Error saving user", null, 500, false);
}

})


// resend otp api 

authRouter.post("/resendOtp", async (req, res) => {
     let phone = req.body.phone;
     if(!phone){
         return customResponse(res, "Please provide phone number", null, 400, false);
     }

     let foundUser = await User.findOne({phone: phone});

     if(foundUser == null){
            return customResponse(res, "User not found with this phone number", null, 400, false);
     }

     if(foundUser.otp_verified){
         return customResponse(res, "User already verified", null, 400, false);
     }
      let otp = generateOtp();
      foundUser.otp = otp;
      foundUser.otp_sent_at = new Date();

     let updatedUser = await  foundUser.save();
        if(updatedUser == null){
            return customResponse(res, "Error updating user", null, 500, false);
        }

     sendSms(`Your Otp is ${updatedUser.otp}`,updatedUser.phone)
    return customResponse(res, "Otp sent successfully", updatedUser, 200, true);

})

// verify otp api => phone, otp

// epoch time in js



// resend mail verification api (email)
// verify email api

// login api: 




module.exports = authRouter;


// phone verification: 

// verify otp

// resend otp  

// email Verifctionapi 

// resend email verification

// login api


// JWT => json web token