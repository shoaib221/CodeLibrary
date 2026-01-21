import { SearchOutlets } from "@/nextjs-library/react-leaflet/leaflet.jsx";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { GetInTouch } from "./getintouch.jsx";



export const Contact = () => {

    return (

        <div className="w-full" >

            <div className="w-full grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] gap-4" >
                <SearchOutlets />

                <GetInTouch />
            </div>

            
        </div>

    )
}