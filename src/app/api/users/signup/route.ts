/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest, res: NextResponse) {  
        try{
                const reqBody = await req.json();
                const {username, email, password} = reqBody

                // validate the user input
                const user = await User.findOne({email: email});
                if(user) {
                        return NextResponse.json({error: "Email already exists"}, {status: 400})
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                        username,
                        email, 
                        password: hashedPassword
                })

                const savedUser = await newUser.save();
                console.log(savedUser);

                // now send the verification email
                await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

                return NextResponse.json({
                        message: "User created successfully",
                        success: true,
                        savedUser
                });
        }
        catch(error: any) {
                return NextResponse.json({error: error.message}, {status: 500});
        }
}