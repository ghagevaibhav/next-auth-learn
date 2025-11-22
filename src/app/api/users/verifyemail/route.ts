/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
        try {
                const reqBody = await req.json();
                const {token} = reqBody;
                console.log("Token: " + token);

                if (!token) {
                        return NextResponse.json({
                                 error: "Token Not Provided" }, { status: 400 }
                        );
                }
                      
                const user = await User.findOne({
                        verifyToken: token,
                        verifyTokenExpiry: { 
                                $gt: Date.now() 
                        }
                });
                      
                console.log("User: " + user); 

                if (!user) {
                        return NextResponse.json(
                                { error: "Invalid or Expired Token" },
                                { status: 400 }
                        );
                }

                user.isVerified = true;
                user.verifyToken = undefined;
                user.verifyTokenExpiry = undefined;
                // db is in different continent so await (words to live by Hitesh :) (chai or code))
                await user.save();

                return NextResponse.json({
                        message: "Email Verified Successfully",
                        success: true
                }, { status: 200 })
        }
        catch(error: any) {
                return NextResponse.json({
                        message: error.message,
                        success: false
                })
        }
} 