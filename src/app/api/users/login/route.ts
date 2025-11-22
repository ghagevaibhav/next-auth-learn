/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
        try {
                const reqBody = await req.json();
                const {email, password} = reqBody

                // validate the user input
                const user = await User.findOne({email});

                if(!user) {
                        return NextResponse.json({error: "User Does Not Exist"}, {status: 400})
                }

                console.log("User Exists");

                const isPasswordCorrect = await bcrypt.compare(password, user.password);

                if(!isPasswordCorrect) {
                        return NextResponse.json({error: "Check Your Credentials"}, {status: 400})
                }

                // if(!user.isVerified) {
                //         return NextResponse.json({error: "Email Not Verified"}, {status: 400})
                // }

                const payload = {
                        id: user._id,
                        username: user.username
                }

                const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET!, { expiresIn: "1h" });

                const response = NextResponse.json({
                        message: "Login Successful",
                        success: true,
                })

                response.cookies.set("token", jwtToken, {
                        httpOnly: true
                })

                return response;
        }
        catch(error: any){
                return NextResponse.json({error: error.message}, {status: 500});
        }
}