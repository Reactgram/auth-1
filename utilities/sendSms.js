// import aws from 'aws-sdk';
const aws = require('aws-sdk');

aws.config.update({
    region: "ap-south-1"
})

function sendSms(message, phone="+917904421580"){

    const params = {
        Message: message,
        PhoneNumber: phone,
        
    }

    let publishTextPromise = new aws.SNS({apiVersion: "2010-03-31"}).publish(params).promise();
    publishTextPromise.then(data => console.log(data))
    publishTextPromise.catch(err => console.log(err))
}

// sendSms("Hello from AWS SNS", "+918851729882");

// export default sendSms;
module.exports = sendSms;