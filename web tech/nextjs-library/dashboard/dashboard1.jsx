"use client"

import React, { useEffect, useState } from 'react';
import { ForbiddenAccess } from '@/nextjs-library/miscel/ForbiddenAccess.jsx';
import { useAuthContext } from '@/nextjs-library/auth/auth1.jsx';
import './dashboard1.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box17, Box18, Box19 } from '../box/box1';
import axios from 'axios';
import { useMyImage } from '../Media/image';
import { AddService } from '../Form/Form1';
import { Loading } from '../miscel/Loading';


export const Dashboard = () => {
    const { profile } = useAuthContext();

    if (profile?.role === 'admin') return <AdminDash />;

    return <ForbiddenAccess />;
};




export const AdminDash = () => {
    const searchParams = useSearchParams();
    const [board, setBoard] = useState(searchParams.get('board'));
    const router = useRouter();

    function ChangeBoard(newBoard) {
        router.push(`/dashboard?board=${newBoard}`);
        setBoard(newBoard);
    }

    return (
        <div>
            <div className='flex gap-2 box-shadow-3 p-1' >
                <div className={`${board === 'booking' ? 'button-5sel' : 'button-5' } side-shadow-1`}
                    onClick={() => ChangeBoard('booking')}
                > Manage Bookings </div>
                
                <div onClick={() => ChangeBoard('add-service')}
                    className={`${board === 'add-service' ? 'button-5sel' : 'button-5' } side-shadow-1`} > Add Service </div>

                <div onClick={() => ChangeBoard('manage-services')}
                    className={`${board === 'manage-services' ? 'button-5sel' : 'button-5' } side-shadow-1`} > Manage Services </div>

            </div>


            {board === 'booking' && <Booking />}
            {board === 'add-service' && <AddService />}
            {board === 'manage-services' && <ManageServices />}


        </div>
    )
};




const Booking = () => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {

        async function FetchBookings() {
            try {
                let res = await axios.get('/api/caregiving/bookings')
                setBookings(res.data.bookings)
                //alert( 'fetched bookings' )
            } catch (err) {
                console.log(err.message)
            }
        }

        FetchBookings();

    }, [])

    return (
        <div className='grow relative flex flex-col gap-2 my-4' >
            {bookings && bookings.map((elem, _) => <Box18 key={_} booking={elem} />)}
        </div>
    );

}


const ManageServices = () => {
    const [services, setServices] = useState(null);

    useEffect(() => {

        async function fetch() {
            try {
                let res = await axios.get('/api/caregiving/service')
                console.log(res.data.services)
                setServices(res.data.services)
            } catch (err) {
                console.log(err)
            }
        }

        fetch()

    }, [])

    return (
        <div>
            <br/> <br/>
            <div className="flex flex-wrap gap-4 justify-evenly" >
                {services ? services.map(elem => <Box17 admin={true} key={elem._id} data={elem} />) : <Loading />}
            </div>
        </div>
    )
}



