"use client"

import { useState } from "react";
import axios from "axios";
import { FaRegSmile } from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import { MdOutlineDriveFolderUpload } from "react-icons/md";


const  defaultImage = "https://i.ibb.co.com/7tmkDpb6/Screenshot-2026-01-04-224203.png";

export const useMyImage = ({ url } = {}   ) => {


    const [photo, setPhoto] = useState( url  );
    const [imageFile, setImageFile] = useState(null);

    function resetPhoto( url ) {
        setImageFile(null)
        setPhoto( url ? url : defaultImage);
    }


    async function Upload() {
        try {


            if (imageFile) {
                // Convert file to base64
                const base64Img = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64 = reader.result.replace(/^data:.+;base64,/, "");
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });

                // Upload to imgbb
                const formData = new FormData();
                formData.append("image", base64Img);

                console.log(process.env)

                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_Imagebb}`,
                    formData
                );

                const imageUrl = res.data.data.display_url;
                setPhoto(imageUrl);
                setImageFile(null);
                console.log("image uploaded to cloud")
                return imageUrl;

            }

            return photo;

        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const imageChange = (event) => {
        let file = event.target.files[0];

        if (file) {
            setImageFile(file)
            let url = URL.createObjectURL(file)
            setPhoto(url)
        }
    }


    const Tag01 = () => {



        return (
            <div className="bg-cover bg-center h-60 w-full relative rounded-xl mb-4"
                style={{ backgroundImage: `url(${photo})` }} >

                {!photo && <div className="flex flex-col items-center justify-center h-full text-(--color1a) bg-black/30" >
                    <FaRegSmile className="text-5xl mb-2" />
                    <div>No Photo</div>
                </div>}

                <div className="absolute p-2 z-20 rounded-full -bottom-5 left-[40%] bg-(--color1) cursor-pointer" >
                    Upload Photo
                    <input type="file" onChange={imageChange} className="opacity-0 absolute cursor-pointer inset-0 h-full w-full" />
                </div>
            </div>
        )
    }


    const Tag02 = () => {
        return (
            <div className="bg-cover bg-top h-52 w-52 relative rounded-full mb-4 mx-auto border-4 border-(--color4)"
                style={{ backgroundImage: `url(${photo})` }} >

                {!photo && <div className="flex flex-col items-center justify-center h-full text-(--color1a) bg-black/30" >
                    <FaRegSmile className="text-5xl mb-2" />
                    <div>No Photo</div>
                </div>}

                <div className="absolute p-2 z-20 text-2xl rounded-full -bottom-5 left-[40%] bg-(--color1) text-(--color4) cursor-pointer" >
                    <MdOutlineDriveFolderUpload />
                    <input type="file" onChange={imageChange} className="opacity-0 absolute cursor-pointer inset-0 h-full w-full" />
                </div>
            </div>
        )
    }


    return { uploadPhoto: Upload, resetPhoto, PhotoTag: Tag02, PhotoTag2: Tag01 }


}

