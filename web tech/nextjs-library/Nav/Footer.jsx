"use client"

import React, { useState } from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaFacebook, FaGlobe, FaPhone } from "react-icons/fa";
import { TbBrandStocktwits } from "react-icons/tb";
import { Logo } from './Nav';
import { useNavContext } from './context';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

import './Footer.css'
import { IoLocationSharp } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';

export const FooterTag = () => {
    const [show, setShow] = useState(false)
    const { screen } = useNavContext()

    return (
        <div onClick={() => setShow(prev => !prev)} className='footer-1' >
            <div className='flex items-center gap-2 p-2 header-1' >
                {(show && screen.width < 1024) && <BiUpArrow />}
                {(!show && screen.width < 1024) && <BiDownArrow />}
                {"  "}  Social Links
            </div>

            {
                (show || screen.width > 1024) && (
                    <div className='flex flex-col pl-8 lg:pl-2 gap-2' >
                        <a href='https://www.facebook.com/programmingHero/' target='_blank' rel='noopener noreferrer' className='footer-2' >
                            <FaFacebook /> Facebook
                        </a>

                        <a href='https://www.facebook.com/programmingHero/' target='_blank' rel='noopener noreferrer' className='footer-2' >
                            <FaLinkedin /> Linkedin
                        </a>

                    </div>
                )
            }
        </div>
    )


}

export const FooterTag1 = () => {
    const [show, setShow] = useState(false)
    const { screen } = useNavContext()

    return (
        <div onClick={() => setShow(prev => !prev)} className='footer-1' >
            <div className='flex items-center gap-2 p-2 header-1' >
                {(show && screen.width < 1024) && <BiUpArrow />}
                {(!show && screen.width < 1024) && <BiDownArrow />}
                {"  "}  Partners
            </div>

            {
                (show || screen.width > 1024) && (
                    <div className='flex flex-col pl-8 lg:pl-2 gap-2' >
                        <a href='https://www.squarepharma.com.bd/' target='_blank' rel='noopener noreferrer' className='footer-2' >
                            <FaGlobe /> Square
                        </a>

                        <a href='https://www.evercarebd.com/en//dhaka' target='_blank' rel='noopener noreferrer' className='footer-2' >
                            <FaGlobe /> Evercare
                        </a>

                    </div>
                )
            }
        </div>
    )
}


export const FooterTag2 = () => {
    const [show, setShow] = useState(false)
    const { screen } = useNavContext()

    return (
        <div onClick={() => setShow(prev => !prev)} className='footer-1' >
            <div className='flex items-center gap-2 p-2 header-1' >
                {(show && screen.width < 1024) && <BiUpArrow />}
                {(!show && screen.width < 1024) && <BiDownArrow />}
                {"  "}  Contacts
            </div>

            {
                (show || screen.width > 1024) && (
                    <div className='flex flex-col pl-8 lg:pl-2 gap-2' >
                        

                        <div className="flex gap-2 items-center" >
                            <IoLocationSharp />
                            4/A, Chankharpul, Dhaka 9009.
                        </div>

                        <div className="flex gap-2 items-center" >
                            <FaPhone />
                            01303909909
                        </div>

                        <div className="flex gap-2 items-center" >
                            <MdMail />
                            info@care.in
                        </div>

                    </div>
                )
            }
        </div>
    )
}






export const Footer = () => {

    return (
        <div id='footer' className='px-8 mt-4 bg-(--color1a)' >

            <div className='text-center header-2' > Important Links </div> <br/>

            <div className='flex flex-col gap-2 lg:flex-row justify-evenly' >
                <FooterTag />
                <FooterTag1 />
                <FooterTag2 />

            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2026 - All rights reserved
            </div>
            <br />
        </div>
    );
};