import nodemailer, { SendMailOptions } from "nodemailer";

const emailSender = "chalvantzis12@outlook.com";

export const sendEmail = (email: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions: SendMailOptions = {
        from: emailSender,
        to: email,
        subject: "Thank your for registering",
        html: "<h1>Welcome to our website!!!</h1>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
