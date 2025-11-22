import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id: userId}).select("-password")
        console.log(user)
        if(!user) {
                return NextResponse.json({
                        message: "Invalid Token",
                        success: false
                })
        }

        return NextResponse.json({
                user: user
        })

}