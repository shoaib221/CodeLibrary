"use client"

import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './box1.css';
import '../buttons/buttons.css';
import { IoPerson } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import '../style/header.css'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { format } from 'date-fns';
import { useAuthContext } from '../auth/auth1';
import axios from 'axios';



export const Box11 = ({ job }) => {


    return (
        <div className='h-60 p-2 box-1' >
            <div className='w-full h-28 bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} >  </div>
            <div className='font-bold' >{job.title} </div>
            <div className='text-[.8rem] italic' > {job.summary.substring(0, 80)} ...</div>
            <div className='flex text-[.7rem] justify-between' >
                <div className='flex gap-1 items-center' > <IoPerson /> {job.postedBy} </div>
                <div className='flex gap-1 items-center' > {job.category} <BiCategory /> </div>
            </div>
            <button className='button-1' onClick={() => navigate(`/job-detail/${job._id}`)} >
                View Detail
            </button>
        </div>
    )
}


export const Box12 = ({ job }) => {


    return (
        <div className='min-h-[20rem] min-w-[15rem] max-w-[15rem] p-2 box-1 flex flex-col justify-between' >
            <div className='font-bold text-lg mb-2' >{job.name} </div>
            <div className='h-[7rem] w-[7rem] p-2  bg-cover bg-center rounded-full mx-auto' style={{ backgroundImage: `url(${job.photo})` }} ></div>
            <div className='text-[.9rem] italic' > {job.description} </div>

        </div>
    )
}

export const Box13 = ({ job }) => {
    return (
        <div className='min-h-[15rem] p-2 box-1 flex flex-col gap-1 justify-between' >
            <div className='font-bold text-lg mb-2' >{job.name} </div>
            <a href={job.live} target='_blank' rel='noopener noreferrer' title='Visit Live'
                className='h-[12rem] w-full p-2 border-(--color1) border-2 hover:bg[90%] rounded-lg hover:border-(--color7a) bg-cover bg-center mx-auto block' style={{ backgroundImage: `url(${job.photo})` }} ></a>
            <div className='text-[.9rem] italic' > {job.description} </div>

            <a href={job.source} target='_blank' rel='noopener noreferrer' className='button-a mt-2 inline-block text-center'>
                Source
            </a>

        </div>
    )
}


export const Box14 = ({ job }) => {
    return (
        <div className='flex  box-shadow-1 flex-col sm:flex-row-reverse p-2 gap-2 w-full max-w-[900px] mx-auto' >

            <a href={job.live} target='_blank' rel='noopener noreferrer' title='Visit Live'
                className='h-72 sm:h-80 w-full bg-cover bg-top sm:w-[50%] sm:min-w-[50%] block' style={{ backgroundImage: `url(${job.photo})` }} ></a>

            <div className='w-full sm:flex-grow flex flex-col items-end justify-center' >
                <div className='font-bold text-lg mb-2' >{job.name} </div>
                <div className='text-[.9rem] italic' > {job.description} </div>

                <a href={job.source} target='_blank' rel='noopener noreferrer' className='button-3 mt-2 inline-block'>
                    view
                </a>
            </div>

        </div>
    )
}


export const Box15 = ({ job }) => {
    return (
        <div className='flex  box-shadow-1  flex-col sm:flex-row p-2 gap-2 w-full max-w-[900px] mx-auto' >

            <a href={job.live} target='_blank' rel='noopener noreferrer' title='Visit Live'
                className='h-72 sm:h-80 w-full sm:w-[50%] bg-cover bg-top sm:min-w-[50%] block' style={{ backgroundImage: `url(${job.photo})` }} ></a>

            <div className='w-full sm:flex-grow flex flex-col justify-center' >
                <div className='font-bold text-lg mb-2' >{job.name} </div>
                <div className='text-[.9rem] italic' > {job.description} </div>

                <a href={job.source} target='_blank' rel='noopener noreferrer' className='button-3 mt-2 inline-block'>
                    View
                </a>
            </div>

        </div>
    )
}


export const Box16 = ({ data }) => {
    return (
        <a href={data.link} target='_blank' rel='noopener noreferrer'
            className='h-40 flex justify-center items-center flex-col cursor-pointer block'  >
            <div className='rounded-lg h-12 w-12 bg-cover bg-center mb-2' style={{ backgroundImage: `url(${data.photo})` }} ></div>
            <div className='font-bold hover:underline' >{data.name}</div>
        </a>
    )
}



export const Box17 = ({ data, admin }) => {
    const router = useRouter()

    const ClickHandle = () => {
        if (admin) router.push(`/update-service/${data._id}`);
        else router.push(`/service/${data._id}`);
    }

    return (

        <div className='box-12 p-8' onClick={ClickHandle} title='View Detail' >
            <div style={{ backgroundImage: `url(${data.image})` }} className='h-40 w-40  bg-cover bg-top rounded-full' ></div>
            <br />
            <div className='header-1' > {data.name} </div>
        </div>

    )
}








export const Box18 = ({ booking }) => {

    const [opener, setOpener] = useState(false)
    //console.log( 'booking', booking)
    const router = useRouter()
    const { profile } = useAuthContext();

    async function Confirm() {
        try {

            const info = {
                booking: { ...booking, status: 'confirmed' }
            }
            let res = await axios.post('/api/caregiving/bookings', info);

            toast.success("Booking Confirmed")

        } catch (err) {
            console.error(err.message);

        }
    }


    async function Checkout() {
        try {
            
            let res = await axios.post('/api/caregiving/book', { booking } );

            router.push(res.data.url)

        } catch (err) {
            console.error(err.message);

        }
    }

    console.log(booking)

    return (
        <div className='box-shadow-1 mx-2  my-1 rounded-lg' >
            <div className='justify-between p-2 flex cursor-pointer' onClick={() => setOpener(prev => !prev)} >
                <div  >
                    <div className='header-1' style={{ textAlign: 'left' }} > {booking.service.name} </div>
                    <div> <span className='font-bold' >Booking ID # </span>   {booking._id}  </div>

                </div>

                {opener ? <IoIosArrowUp /> : <IoIosArrowDown />}

            </div>

            {
                opener && <div className='p-4 grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-2 w-full max-w-150' >

                    <div className='font-bold border border-(--color1a) p-1' > Client: </div>
                    <div className='flex gap-2 items-center border border-(--color1a) p-1' >


                        <div>
                            {booking.booker?.name}
                            <br />
                            {booking.booker?.username}

                        </div>



                    </div>

                    <div className='font-bold p-1 border border-(--color1a)' > Client&apos;s address:  </div>
                    <div className='p-1 border border-(--color1a)' > {booking.address}  {booking.city}, {booking.district}, {booking.division} </div>

                    <div className='font-bold border p-1 border-(--color1a)' > Booked from :   </div>
                    <div className='p-1 border border-(--color1a)' >  {format(booking.startTime, 'dd MMM yyyy, hh a')} </div>

                    <div className='font-bold border p-1 border-(--color1a)' > Booked to :   </div>
                    <div className='p-1 border-(--color1a) border' >  {format(booking.endTime, 'dd MMM yyyy, hh a')} </div>

                    <div className='font-bold p-1 border-(--color1a) border' > Cost :   </div>
                    <div className='p-1 border-(--color1a) border' > {booking.totalCost} USD </div>

                    <div className='font-bold p-1 border-(--color1a) border' > Booking Status: </div>
                    <div className='p-1 border-(--color1a) border' > {booking.status} </div>

                    <div className='font-bold p-1 border-(--color1a) border' > Payment Status: </div>
                    <div className='p-1 border-(--color1a) border' > {booking.paymentStatus}  </div>



                    { booking.paymentStatus === 'unpaid' && profile.username === booking.booker.username  &&  <button className='button-4' onClick={Checkout} >Checkout</button>  }

                    {profile?.role === 'admin' && booking.paymentStatus === 'paid' && booking.status === 'pending' && <button className='button-4' onClick={Confirm} > Confirm Booking</button>}
                </div>
            }
        </div>
    )
}




