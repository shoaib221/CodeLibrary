"use client"

import React, { useState } from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { TbBrandStocktwits } from "react-icons/tb";
import { Logo } from './Nav';
import { useNavContext } from './context';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

export const FooterTag = () => {
    const [ show, setShow ] = useState(false)
    const { screen } = useNavContext()

    return (
        <div onMouseEnter={ () => setShow(true) } onMouseLeave={ () => setShow(false) } >
            <div className='flex' >
                { ( show && screen.width < 1024 ) && <BiUpArrow /> }
                { ( !show && screen.width < 1024 ) && <BiDownArrow /> }
                { "  " }  Contact 
            </div>

            {
                ( show || screen.width > 1024 ) && (
                    <div className='flex flex-col pl-2' >
                        <div>
                            FaceBook
                        </div>

                        <div>
                            Linkedin
                        </div>

                        <div>
                            Twitter
                        </div>

                        
                    </div>
                )
            }
        </div>
    )


}


export const Footer = () => {

    return (
        <div id='footer' className='px-8 mt-4' >
            
            <div className='flex flex-col lg:flex-row justify-evenly' >
                <FooterTag />
                <FooterTag />
                <FooterTag />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2025 - All right reserved
            </div>
        </div>
    );
};