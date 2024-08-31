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

module.exports = authRouter;


// phone verification: 

// verify otp

// resend otp  

// email Verifctionapi 

// resend email verification

// login api