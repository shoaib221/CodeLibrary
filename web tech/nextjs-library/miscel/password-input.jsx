import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"




export const PasswordInput = (props) => {
    const [eye, setEye] = useState(false)

    function EyeToggle(event) {
        event.preventDefault();
        setEye(!eye);
    }

    return (
        <div className='relative flex flex-col justify-center items-center' >
            <input {...props} type={eye ? 'text' : 'password'} />
            <button className='absolute right-0' onClick={EyeToggle}  >
                {eye ? <FaEye /> : <FaEyeSlash />}
            </button>
        </div>
    )


}

