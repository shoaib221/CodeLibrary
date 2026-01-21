"use client"

import React, { useEffect, useState } from 'react';
import { FaStethoscope } from "react-icons/fa";
import { useNavContext } from './context';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from '@/nextjs-library/miscel/Loading.jsx';
import axios from 'axios';
import { Logo11 } from './Logo1.jsx';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useAuthContext } from '../auth/auth1.jsx';
import { ThemeButton11 } from '../Theme/ThemeButton1';


export const Logo = () => {
    return (
        <div className='h-12 text-(--color4) flex gap-2 items-center' >
            <FaStethoscope className='h-full text-2xl' />
            <div className='cen-ver font-extrabold text-2xl'  >Care.in</div>
        </div>
    )
};


const SmallScreenTag = () => {
    const { down1, DownWindow } = useNavContext();

    if (down1) return (
        <div className='text-xl flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(false)} >
            <IoIosArrowUp />
        </div>
    )

    return (
        <div className='text-xl flex justify-center px-6 items-center lg:hidden cursor-pointer' onClick={() => DownWindow(true)} >
            <IoIosArrowDown />
        </div>
    )
}

const LargeScreenTag = () => {
    const { DownWindow, navi } = useNavContext();
    const { profile } = useAuthContext()

    return (
        <div className='hidden lg:flex text-[0.9rem] gap-2 justify-center' >
            <div onClick={() => DownWindow(false, "/")} className={`nav ${navi === "/" ? "active-nav" : ""}`}  >Home</div>
            { profile && <div onClick={() => DownWindow(false, "/my-bookings")} className={`nav ${navi === "/my-bookings" ? "active-nav" : ""}`} >My Bookings</div>}
            {profile && profile.role === 'admin' && <div onClick={() => DownWindow(false, "/dashboard")} className={`nav ${navi === "/dashboard" ? "active-nav" : ""}`} >Dashboard</div>}
        </div>
    )
}



const DownWindowTag = () => {
    const { down1, DownWindow, navi, screen } = useNavContext()
    const { profile } = useAuthContext()

    return (
        <div className={`${ (down1 && screen.width < 1024) ? "flex" : "hidden"} fixed z-30  bg-(--color1)  flex-col items-center top-14 left-0 right-0 bottom-0 p-4 gap-4`}  >
            <div onClick={() => DownWindow(false, "/")} className={`nav ${navi === "/" ? "active-nav" : ""}`}  >Home</div>
            <div onClick={() => DownWindow(false, "/my-bookings")} className={`nav ${navi === "/my-bookings" ? "active-nav" : ""}`} >My Bookings</div>
            {profile && profile.role === 'admin' && <div onClick={() => DownWindow(false, "/dashboard")} className={`nav ${navi === "/dashboard" ? "active-nav" : ""}`} >Dashboard</div>}
            <ThemeButton11 />
        </div>
    )
}


export const Nav = () => {
    
    return (
        <div className='h-14 flex justify-between items-center px-4 py-2 fixed w-full max-w-400 mx-auto top-0 z-30 bg-(--color1a)' >
            <Logo />


            <LargeScreenTag />
            <SmallScreenTag />

            <Logo11 />

            <DownWindowTag />

        </div>
    )
}