
const nodemailer = require('nodemailer')
require('dotenv').config();


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    
    transporter.verify((error, success) => {
        if(error) {
            console.log(error);
        }else {
            console.log("its working")
        }
    })


const sendApiKey = async(userInfo, res) => {
    const {email, api_key} = userInfo;
    console.log("in sendapikey", email, api_key)

    const mailOptions = {
        from: "Data Aggregator API",
        to: email,
        subject: "API key from Data Aggregator API",
        html: `<p>Thanks for signing up with us</p>
                <p>Here is your API key <b>${api_key}</b>.</p>`         
    }
    try{
        await transporter
        .sendMail(mailOptions)
        .then(() => {
            return res.json({
                status: "success",
                message: 'API key sent via email'
             })
        })
        .catch((error) => {
            console.log(error);
            return res.status(403).json({
                status: 'failed',
                message: 'An error occured while sending mail',
                userInfo
             })
        })
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            status: "failed",
            message: 'An error occured',
            userInfo
        })
    }

}



module.exports = sendApiKey;
