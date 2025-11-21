// nodemailer will be used
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";

interface EmailInterface {
        email: string;
        emailType: string;
        userId: string;
}

export const sendEmail = async ({email, emailType, userId} : EmailInterface) => {
        try {
                // create a token to send in email
                const hashedToken = await bcrypt.hash(userId.toString(), 10)

                // TODO : Configure mail for email verification and pass reset
                if(emailType === 'VERIFY') {
                        await User.findByIdAndUpdate(userId, {
                                verifyToken: hashedToken,
                                verifyTokenExpiry: Date.now() + 60 * 60 * 1000
                        })
                }
                else if(emailType === 'RESET') {
                        await User.findByIdAndUpdate(userId, {
                                forgotPasswordToken: hashedToken,
                                forgotPasswordExpiry: Date.now() + 60 * 60 * 1000
                        }) 
                }

                // Looking to send emails in production? Check out our Email API/SMTP product!
                // const transporter = nodemailer.createTransport({
                //         host: process.env.MAILTRAP_HOST,
                //         port: 2525,
                //         auth: {
                //                 user: process.env.MAILTRAP_USER,
                //                 pass: process.env.MAILTRAP_PASS
                //         }
                // });


                const transporter = nodemailer.createTransport(
                        MailtrapTransport({
                        token: process.env.MAILTRAP_TOKEN!,      
                        })
                
                );

                const html = `
                        <h1>Hello ${email}</h1>
                        <br/>
                        Click the link below to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'} your email. 
                        <a href=${process.env.DOMAIN}/verifyemail?token=${hashedToken}>${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}</a>
                        <br/>
                        or copy and paste the link below into your browser:
                        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                        <br/>
                        <br/>
                        `

                const mailOptions = {
                        from: 'sinnerjhon@gmail.com',
                        to: email, 
                        subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
                        html: html,
                }

                const response = await transporter.sendMail(mailOptions);
                console.log(response);
        }
        catch{
                console.log("Error connecting to server");
        }
}