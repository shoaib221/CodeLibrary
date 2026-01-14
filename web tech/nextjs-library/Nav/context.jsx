"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import './nav.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useAuthContext } from '../auth/auth1.jsx';


const Navcontext = createContext();
export const useNavContext = () => useContext(Navcontext);

export const NavProvider = ({ children }) => {
    const { data: session, status } = useSession()
    const [navi, setNavi] = useState('/');
    const [down1, setDown1] = useState(false);
    const router = useRouter();
    const { profile } = useAuthContext()
    const [screen, setScreen] = useState({ width: window.innerWidth, height: window.innerHeight });


    useEffect(() => {
        const handleResize = () => {
            setScreen({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function DownWindow(wind, path) {
        setDown1(wind)
        if (path) {
            router.push(path)
            setNavi(path)
        }
    }


    const info = { DownWindow, profile, session_status: status, down1, navi, screen } ;

    
    return (
        <Navcontext.Provider value={info} >
            {children}
        </Navcontext.Provider>
    );
};

