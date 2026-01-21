"use client"

import { useState, useEffect, useRef } from "react";
import { User, Settings, LogOut, Bell, HelpCircle } from "lucide-react";
import { useThemeContext } from "../Theme/Theme";
import { ThemeButton11 } from "../Theme/ThemeButton1";
import { useNavContext } from "./context";
import {  signOut } from 'next-auth/react';
import { Loading } from "../miscel/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/auth1";



// Profile logo
export  function Logo11({  userName = "User" }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { profile, sessionStatus } = useAuthContext()
    const router = useRouter();
    const { screen } = useNavContext()

    
    

    // Close menu when clicking outside
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const menuOptions = [
        {
            icon: User,
            label: "My Profile",
            action: () => router.push('/profile'),
        },
        {
            icon: LogOut,
            label: "Sign Out",
            action: () => signOut(),
            danger: true,
        },
    ];

    const handleOptionClick = (option) => {
        option.action();
        setIsOpen(false);
    };

    return (
        <div className="relative flex gap-2" ref={menuRef}>
            { screen.width > 1024 && <ThemeButton11 /> }


            {/* Profile Photo Button */}
            { profile ?
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full overflow-hidden  transition-all duration-200 hover:scale-105"
            >
                <div
                    className="w-full h-full bg-cover bg-top"
                    style={{ backgroundImage: `url(${profile.photo})` }}
                />
            </button>
            :
                <button className="font-bold text-(--color4) hover:opacity-70 cursor-pointer" onClick={ () => router.push('/register') } >Register</button>
            }

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-12 mt-2 w-40 sm:w-64 bg-(--color4) text-(--color1) rounded-lg 
                                shadow-2xl overflow-hidden z-50">
                    

                    {/* Menu Options */}
                    <div className="py-2">
                        {menuOptions.map((option, index) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className={`w-full px-4 py-3 flex items-center gap-3 hover:opacity-70 cursor-pointer`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


// profile logo
export const Logo12 = () => {
    
    const router = useRouter()
    const { profile, session_status } = useNavContext()

    function SignOut(e) {
        signOut()
    }
    

    if (session_status === 'loading') return <Loading />

    

    if(profile) return (

        <div className='flex' onClick={ () =>  router.push( "/profile" ) } >
            {/* <div className='button-1234' onClick={SignOut}>Sign Out</div> */}
            {/* { JSON.stringify( session ) } */}
            <Image
                src={profile.photo}
                alt='Profile Photo'
                width={36}
                height={36}
                className='rounded-full cursor-pointer'
                title={profile.username}
            />
            
        </div>
    )

    return (
        <button className='button-1234' onClick={async () => {
            await signOut({ redirect: false });
            router.push('/api/auth/register');
        }}  >
            Sign Up
        </button >
    )

}
