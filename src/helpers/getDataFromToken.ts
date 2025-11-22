/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function getDataFromToken(req: NextRequest) {
        try {

                const token = req.cookies.get("token")?.value || "";
                // console.log(token)
                if(!token) return NextResponse.json({
                        message: "No Token Found",
                        success: false
                })

                const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET!)
                console.log(decoded)
                const { id }: any = decoded
                return id
        }
        catch (error: any) {
                return NextResponse.json({
                        error: error.message,
                }, {status: 400})
        }

}