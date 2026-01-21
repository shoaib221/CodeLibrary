import { useForm } from 'react-hook-form'
import '../input/input1.css'
import axios from 'axios'
import { send } from 'process'
import { toast } from 'react-toastify'

export const GetInTouch = () => {

    const { register, handleSubmit, reset } = useForm()

    async function SendMessage(data) {
        let sender = data;
        try {
            let res = await axios.post('/api/send-message', { sender })
            toast.success("Thanks for your knock")
            reset();
        } catch(err) {
            console.log(err.message)
        }
        
    }

    return (
        <div className="grid grid-cols-[1fr_1fr] w-full gap-2 p-2" >
            <div className="header-2 col-span-2" >Get In Touch</div>
            <div className="col-span-2 text-center" >We’re here to help you with any healthcare needs right at your doorstep.</div>
            <input {...register("name", { required: "Name is required" })}
                className='input-2 col-span-2' placeholder='Your Name' />

            <input
                type='number'
                {...register("phone", { required: "Phone is required" })}
                className='input-2 col-span-1' placeholder='Phone Number' />

            <input 
                type='email'
                {...register("email", { required: "Email is required" })}
                className='input-2 col-span-1' placeholder='Email' />

            <textarea
                className='col-span-2 resize-none p-2 rounded-lg' rows={4}
                {...register("message", {
                    maxLength: {
                        value: 400,
                        message: "Maximum 400 words",
                    },
                })}
                placeholder='Write your message ...'
            />
            <br />

            <button className='button-4 col-span-2' onClick={handleSubmit(SendMessage)} >
                Send Message
            </button>
        </div>
    )
}