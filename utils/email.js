const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.elasticemail.com',
    //     port: 2525,
    //     auth: {
    //         user: 'ferdinandimeka20@gmail.com',
    //         pass: '3AA373E2291AA136F75A7814176626154456'
    //     }
    // });

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     auth: {
    //         user: 'darryl92@ethereal.email',
    //         pass: 'Beae5ark8pbykc3Qdq'
    //     }
    // });

    // 2) Define the email options
    const mailOptions = {
        from: 'process.env.EMAIL_FROM',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;