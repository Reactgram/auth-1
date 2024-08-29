// two platform => gmail and sendgrid , ZohoEmail
// abhishekchoudhary.me@gmail.com
// ojtgypwgofdwrpmh

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

// fs module  => file system
// path module => path of the file
 

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
            user: "abhis.me@gmail.com",
            pass: "ojtgypwgorpmh"
        }
    })

    // ejs template
    
      const templatePath = path.join(__dirname, `../templates/mail3.html`)

    // const templatePath = path.join(__dirname, "..", "templates", "mail3.html");

    //   const htmlTemplate = await ejs.renderFile(templatePath, {name: "Naman", otp: "1234"});
    let htmlString = fs.readFileSync(templatePath, "utf-8");
    htmlString = htmlString.replaceAll("{{name}}", "Naman");
    htmlString = htmlString.replaceAll("{{link}}", "https://www.google.com");
    
    //  for attachments: 
    const attachmentPath1 = path.join(__dirname, `../static/cover.png`)
    const attachmentPath2 = path.join(__dirname, `../static/javascriptNotes.pdf`)


    const mailOptions = {
        from: "abhishekchoudhary.me@gmail.com",
        to: "nama@gmail.com",
        subject: "Registartion email with attachments",
        html: htmlString,
        attachments: [
            {
                filename: "cover.png",
                path: attachmentPath1

            },
            {
                filename: "javascriptNotes.pdf",
                path: attachmentPath2
            }
        ]
    }

    try{
          const email_sent_info = await taransporter.sendMail(mailOptions);
          console.log(email_sent_info);
    }
    catch(err){
        console.log(err);
    }
}


// letsMail()




module.exports = letsMail;



// ../