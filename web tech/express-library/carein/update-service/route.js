"use server"

import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options'
import { NextResponse } from "next/server";
import { Booking, Service } from '@/app/api/caregiving/model'
import { User } from "@/app/api/auth/model";




export const POST = async (req) => {

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let user = await User.findOne({ username: session.user.email })

        if (user.role !== 'admin') return NextResponse.json(
            { error: "Admin only access" },
            { status: 401 }
        );

        let data = await req.json();

        let { _id, name, ...updation } = data;

        let new_service = await Service.findByIdAndUpdate(
            _id,
            { $set: updation },
            { new: true }
        )

        console.log( new_service );

        return NextResponse.json(
            { new_service },
            { status: 200 }
        )
        
    } catch (err) {
        console.log(err.message)
        return new NextResponse.json(
            { error: err.message },
            { status: 400 }
        )
    }
}