"use server";


import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/nextjs-library/lib/dbConnect";
import { User } from "../model";

export async function POST(req) {
    try {

        await dbConnect();

        console.log("register")
        let body = await req.json();

        const user = await User.create(body);

        return NextResponse.json({ msg: "success" }, { status: 200 })

    } catch (err) {
        // console.log(err.message);
        // console.log('#####################')
        // console.dir(err);

        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return NextResponse.json(
                {
                    field,
                    message: `${ field === 'username' ? "Email" : field } already exists`,
                },
                { status: 409 }
            );
        }


        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}



