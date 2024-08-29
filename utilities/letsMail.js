// two platform => gmail and sendgrid , ZohoEmail
// abhishekchoudhary.me@gmail.com
// ojtgypwgofdwrpmh

const nodemailer = require("nodemailer");

// access env: 
const dotenv = require("dotenv");
dotenv.config();


console.log(process.env.gmail);
console.log(process.env.password);

const letsMail =  async (options) =>{


    // taransporter object
    let taransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.gmail,
            pass: process.env.password
        }
    })

    const mailOptions = {
        from: process.env.password,
        to: options.to,
        subject: options.subject,
        text: options.text
    }

    try{
          const email_sent_info = await taransporter.sendMail(mailOptions);
          console.log(email_sent_info);
    }
    catch(err){
        console.log(err);
    }
}





module.exports = letsMail;