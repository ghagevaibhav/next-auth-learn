import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({id: userId})

        if(!user) {
                return NextResponse.json({
                        message: "Invalid Token"
                })
        }

        return NextResponse.json({
                user: user
        })

}