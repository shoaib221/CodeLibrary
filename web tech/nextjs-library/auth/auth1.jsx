"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionProvider } from "next-auth/react"

import { useRouter } from 'next/navigation';
import './auth1.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSession } from 'next-auth/react';
import axios from 'axios';


const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        console.log("logo", status)

        // if( status === 'unauthenticated' ) setProfile(status);
        if (status !== 'authenticated') return;



        async function Fetch() {
            try {
                console.log("status", status)
                let res = await axios.get('/api/auth/profile');
                console.log(res.data, "logo");
                setProfile(res.data.profile);
            } catch (err) {
                console.log(err.message);
            }
        }

        Fetch();

    }, [status])

    const expose  =  {
        profile , sessionStatus: status
    }


    return (
        <AuthContext.Provider value={ expose } >
            {children}
        </AuthContext.Provider>
    )

}







export const SessionProvider1 = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
