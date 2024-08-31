// two platform => gmail and sendgrid , ZohoEmail
// abhishekchoudhary.me@gmail.com
// ojtgypwgofdwrpmh

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

let t1 = path.join(__dirname, "../templates/mail3.html");
// let t2 = path.join(__dirname, "../static/cover.png");




const sendMail =  async (options) =>{


    // taransporter object
    let taransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.gmail,
            pass: process.env.password
        }
    })

    // ejs template
    let htmlString = fs.readFileSync(t1, "utf-8");

    htmlString = htmlString.replace("{{name}}", options.name);
    htmlString = htmlString.replace("{{link}}", options.link);

    
    const mailOptions = {
        from: process.env.gmail,
        to: options.to,
        subject: options.subject,
        html: htmlString,
    }

    try{
          const email_sent_info = await taransporter.sendMail(mailOptions);
          console.log(email_sent_info);
    }
    catch(err){
        console.log(err);
    }
}


/*
   sendMail({
      to: "",
      subject: "",
      name: "",
      link: ""
   })

*/




module.exports = sendMail;



// ../