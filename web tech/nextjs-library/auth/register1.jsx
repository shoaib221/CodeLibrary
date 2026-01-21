"use client"



import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordInput } from "@/nextjs-library/miscel/password-input.jsx"
import { GenderInput } from "@/nextjs-library/input/radio.jsx";
import { useDateInput } from "../input/date";
import axios from "axios";


// email
export const Register11 = () => {

    const {
        register,
        handleSubmit,
        setError,
        control,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            username: "",
            gender: "male",
            birthDate: null
        },
    });

    const { date, DateInput }  =  useDateInput()


    async function Register ( data ) {
        try {
            let info = { ...data, birthDate: date }
            let res = await axios.post( '/api/auth/register', info )
            console.log( "created successfully" )
        } catch (err) {
            const error =  err.response.data;
            if( error.field ) setError( error.field, { type: 'server', message: error.message } )
        }
        
    }

    

    return (
        <div className="max-w-150 mx-auto w-full px-12 py-6 flex-1" >
            <div className="text-2xl text-(--color4) text-center font-bold" > Sign Up </div>

            <form className="flex flex-col" onSubmit={handleSubmit(Register)} >


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
                

                {/* Email */}
                <label className="block mb-3">
                    <span className="text-sm font-bold">Email</span>
                    <input
                        type="email"
                        {...register("username", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        }
                        )}

                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.username ? "ring-(--color5)" : ""}`}
                        placeholder="abc@example.com"
                    />
                    {errors.username && <p className="text-(--color5) text-sm mt-1">{errors.username.message}</p>}
                </label>
                

                {/* Password */}
                <label className="block mb-3">
                    <span className="text-sm font-bold">Password</span>
                    <PasswordInput { ...register( "password" ) } 
                        className={`mt-1 block w-full rounded-lg px-3 py-2 focus:outline-none focus:ring ${errors.password ? "ring-(--color5)" : ""}`}
                        placeholder="******" />
                    {errors.password && <p className="text-(--color5) text-sm mt-1">{errors.password.message}</p>}
                </label>
                
                
                {/* Gender */}
                <label className="block mb-3">
                    <span className="text-sm font-bold">Gender</span>
                    <GenderInput  { ...register( "gender", { required: "Gender is required" } ) }  />
                    
                </label>

                
                {/* BirthDate */}
                <label className="block mb-3">
                    <span className="text-sm font-bold">Date of birth</span>
                    <DateInput />
                </label>

                
                <br />
                <button className="button-4" type="submit" >Submit</button>
            </form>
            <br />

            <div className="text-center" > Already Have an account or want to enter with third-party app? <span className="font-bold underline text-(--color4) cursor-pointer" onClick={() => signIn()} >Visit</span>  </div>
            {/* <div className="text-center" > Forgot password? <span className="font-bold underline text-(--color4) cursor-pointer text-center"  >Reset</span> </div> */}
        </div>
    )
}


