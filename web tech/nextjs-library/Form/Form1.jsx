"use client"

import { useNavContext } from '@/nextjs-library/Nav/context';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { Loading2 } from '@/nextjs-library/miscel/Loading';
import { toast } from 'react-toastify';
import { useMyImage } from '@/nextjs-library/Media/image';
import { useAuthContext } from '@/nextjs-library/auth/auth1.jsx' 
import { useForm } from 'react-hook-form';



export const Register11 = () => {
    
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            profession: "",
            contact: "",
            age: "",
            gender: "male",
            hobbies: [],
            agree: false,
            profile: null,
        },
    });




    async function Update(data) {

        try {
            let photo = await uploadPhoto();
            let res = await axios.post('/api/auth/profile', { ...data, photo });
            toast.success("Updated Successfully")

        } catch (err) {
            console.log(err.message)
        }
    }

    

    return (
        <div className='grow relative w-full max-w-150 px-8 mx-auto' >
            

            <div className='text-center text-2xl text-(--color4) font-bold my-4' >
                Sign Up
                
            </div>


            


            {/* Name */}
            <label className="block mb-3">
                <span className="text-sm font-bold">Name</span>
                <input
                    type="text"
                    {...register("name", {
                        required: "Name is required",
                        minLength: { value: 5, message: "Name must be at least 5 characters" }
                    })}

                    className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.name ? "ring-(--color5)" : ""}`}
                    placeholder="Nikola Tesla"
                />
                {errors.name && <p className="text-(--color5) text-sm mt-1">{errors.name.message}</p>}
            </label>

            <br />

            <label className="block mb-3">
                <span className="text-sm font-bold">Bio</span>
                <textarea
                    type="text"
                    {...register("bio" )}
                    rows={3}
                    className={`mt-1 block w-full resize-none rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.bio ? "ring-(--color5)" : ""}`}
                    placeholder="I invent crazy things"
                />
                {errors.bio && <p className="text-(--color5) text-sm mt-1">{errors.bio.message}</p>}
            </label>
            
            <br/>

            <label className="block mb-3">
                <span className="text-sm font-bold">Profession</span>
                <input
                    type="text"
                    {...register("profession" )}
                    rows={3}
                    className={`mt-1 block w-full resize-none rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.profession ? "ring-(--color5)" : ""}`}
                    placeholder="Inventor"
                />
                {errors.profession && <p className="text-(--color5) text-sm mt-1">{errors.profession.message}</p>}
            </label>

            <br/>

            <label className="block mb-3">
                <span className="text-sm font-bold">Location</span>
                <input
                    type="text"
                    {...register("location" , { required: "Location is required" } ) }
                    className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.bio ? "ring-(--color5)" : ""}`}
                    placeholder="Florida"
                />
                {errors.location && <p className="text-(--color5) text-sm mt-1">{errors.location.message}</p>}
            </label>
            <br/>


            <label className="block mb-3">
                <span className="text-sm font-bold">Contact</span>
                <input
                    type="text"
                    {...register("contact" , { required: "Contact is required" } ) }
                    className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.contact ? "ring-(--color5)" : ""}`}
                    placeholder="880XXXXXXXX"
                />
                {errors.contact && <p className="text-(--color5)">{errors.contact.message}</p>}
            </label>

            <br/>
            <button className='button-4 w-full' onClick={ handleSubmit(Update) } > Update </button>

            <br /> <br />

        </div>
    );
};



