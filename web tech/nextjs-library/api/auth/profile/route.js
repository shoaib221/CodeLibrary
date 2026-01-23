"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../options"
import { User } from "../model.js"
import { NextResponse } from "next/server"
import { dbConnect } from "@/nextjs-library/lib/dbConnect"


export const GET = async (req) => {

    try {

        console.log("profile");
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let profile = await User.findOne({ username: session.user.email });

        return NextResponse.json(
            { profile },
            { status: 200 }
        )



    } catch (err) {
        console.log(err.message)
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}


export const POST = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await dbConnect();

        let { _id, username, password, ...updation } = await req.json();
        

        console.log( updation )

        let updatedProfile = await User.findByIdAndUpdate(
            _id,
            {
                $set: updation
            }, 
            { new: true }
        )

        console.log( updatedProfile )

        return NextResponse.json(
            { profile: updatedProfile },
            { status: 200 }
        )


    } catch (err) {
        console.log( err.message )
        return NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}