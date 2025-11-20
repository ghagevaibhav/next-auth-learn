/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        try {
                const reqBody = await req.json();
                const {token} = reqBody;
                console.log(token);

                if(!token) {
                        return NextResponse.json({
                                error: "Token Not Provided",
                                status: 401
                        })
                }
                const user = await User.findOne({verifyToken: token, verifyExpiry: {$gt: Date.now()}})

                if(!user) {
                        return NextResponse.json({
                                error: "Invalid Token",
                        }, {status: 400}) 
                }

                user.isVerified = true;
                user.verifyToken = undefined;
                user.verifyExpiry = undefined;
                // db is in diff continene so await (words to live by Hitesh :) (chai or code))
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