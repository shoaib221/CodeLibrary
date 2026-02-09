"use server"

import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/options'
import { NextResponse } from "next/server";
import { Booking, Service } from '@/app/api/caregiving/model'
import { User } from "@/app/api/auth/model";
import { format } from "date-fns";
import nodemailer from "nodemailer";



export async function SendMail({  to,  sender }) {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `Care.in` ,
            to,
            subject: `Get in touch with Care.in`,
            html: `
                
                <p> ${ sender.message } </p>
                <p> Best Regards, ${ sender.name } </p>
                <p> Contact: <br/> ${ sender.email }
                <br/> ${ sender.phone }
                
                
            `,
        });

        await transporter.sendMail({
            from: `Care.in` ,
            to: sender.email ,
            subject: `Get in touch with Care.in`,
            html: `
                
                <p> Thanks for your message. We will connect you soon. </p>
                <p> Best Regards, <br/> Care.in </p>
                
                
            `,
        });

        console.log( "Invoice mail sent" )
        return { success: true };
    } catch (err) {
        console.dir(err);
        return { success: false }
    }


}


export const POST = async (req) => {

    try {
        // const session = await getServerSession(authOptions);

        // if (!session) {
        //     return NextResponse.json(
        //         { error: "Unauthorized" },
        //         { status: 401 }
        //     );
        // }

        // let user = await User.findOne({ username: session.user.email })

        

        let data = await req.json();

        
        await SendMail( { to: "shoaibtasrif326@gmail.com", ...data  } )
        

        return NextResponse.json(
            { msg: "success" },
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