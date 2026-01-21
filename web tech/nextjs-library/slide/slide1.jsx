"use client";

import { useEffect, useState } from "react";
import { useNavContext } from "../Nav/context";

const Story = ({ story }) => {

    return (
        <div className='flex flex-col justify-between px-2 md:min-w-80  min-w-60
                        bg-(--color4) hover:bg-(--color4)/80 text-white p-2'  >

            <div className="flex-1 text-justify" >
                {story.comment}
            </div>

            <div className="flex gap-2 items-end" >
                <div className={`w-18 h-18 rounded-full  bg-cover bg-top`} style={{ backgroundImage: `url(${story.image})` }} />
                <div className="text-sm" >
                    {story.name} <br />
                    {story.scholarship} <br />
                    {story.university}
                </div>
            </div>

        </div>
    )
}


const stories = [
    {
        name: "Ayesha Rahman",
        image: "https://tse1.mm.bing.net/th/id/OIP.cV42tAwuBoNSAYftNEgzXAHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Nursing",
        comment:
            "I booked a home nurse for my father, and the experience exceeded expectations. The nurse was skilled, punctual, and compassionate. Our family finally felt relaxed knowing he was in capable hands."
    },
    {
        name: "Daniel Kim",
        image: "https://tse3.mm.bing.net/th/id/OIP.i4YH9hPP_yM3nXMIQDDkQwHaLL?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Elderly Care",
        comment: "The caregiver was extremely professional, patient, and caring. My mother felt safe and respected throughout the service. Communication was excellent, and everything was handled smoothly from booking to completion."
    },
    {
        name: "Maria Gonzalez",
        image: "https://tse1.mm.bing.net/th/id/OIP.4Gt3RAPOCnNj9enH1r6prAHaI-?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "Finding a trustworthy babysitter was always stressful, but this platform made it easy. The sitter was kind, attentive, and responsible, which gave us complete peace of mind during our absence"
    },
    {
        name: "Joshua Patel",
        image: "https://tse1.explicit.bing.net/th/id/OIP.Ir31nRT7lfY0caGpkbec3gHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "From the first contact to service delivery, everything was well organized. Customer support helped us choose the right caregiver, and the service quality fully matched what was promised online."
    },
    {
        name: "Hana Yamada",
        image: "https://tse1.explicit.bing.net/th/id/OIP.BH6Si47Nt136YsDmFAFuQwHaEx?cb=ucfimg2&ucfimg=1&w=1280&h=824&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Nursing",
        comment:
            "The home nurse arrived on time and handled medical care confidently. She explained everything clearly and made my mother comfortable. We are very satisfied with the overall quality and reliability."
    },
    {
        name: "Kevin Brown",
        image: "https://tse1.mm.bing.net/th/id/OIP.P3GWxhGR9Y_K7_-4K1fGRQHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        scholarship: "Baby Sitting",
        comment:
            "Affordable pricing combined with excellent service quality. The babysitter was caring, friendly, and experienced. My child felt comfortable quickly, which is the most important thing for any parent."
    },
    {
        name: "Fatima Noor",
        image: "https://img.freepik.com/premium-photo/bangladeshi-female-student-black-graduation-gown_606460-87.jpg?w=2000",
        scholarship: "Elderly Care",
        comment:
            "The caregiver was respectful, attentive, and well trained. Our elderly family member received both physical support and emotional care, making a noticeable positive difference in daily life."
    },
    {
        name: "Liam Anderson",
        image: "https://media.istockphoto.com/id/171299141/photo/englishman.jpg?s=1024x1024&w=is&k=20&c=FtS_bl0R7qNDr4ECv4RFDq895gzplUlM1kWA1Rjmk54=",
        scholarship: "Baby Sitting",
        comment:
            "This service has been a huge relief for our family. Finding qualified caregivers used to be difficult, but now we feel confident, supported, and secure whenever we need home care assistance."
    }
];


export const ScrollProduct = () => {


    return (
        <>
            <div className="text-2xl font-bold text-(--color4)" >Hear From Our Clients</div>
            <div className='flex overflow-auto h-96 gap-2 w-[95%] p-4 box-shadow-1 my-4 rounded-lg' >
                {stories && stories.map((story, index) => <Story key={index} story={story} />)}
            </div>
        </>
    )
}

// ##################################

// Slide12




// ###########################################################

export function Slide13() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Get the best quality care for elders",
            image: "/banner1.jpg",
        },
        {
            id: 2,
            title: "Get the best doctors in the city at your home",
            image: '/banner2.jpg',
        },
        {
            id: 3,
            title: "Get the best nurses at your home",
            image: '/banner3.jpg',
        },
        {
            id: 4,
            title: "Get the most caring baby sitters",
            image: '/banner4.jpg',
        },
        {
            id: 5,
            title: "Get the most efficient workers ",
            image: "/banner5.jpg",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length, currentSlide]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-1 w-full h-120 p-1 bg-(--color1)">

            {/* pagination */}
            <div className="flex flex-row lg:flex-col gap-4 justify-center">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentSlide === index
                            ? "border-white scale-110 shadow-lg shadow-white/20"
                            : "border-[#333] opacity-50 hover:opacity-80 hover:border-[#666]"
                            }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-top"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    </button>
                ))}
            </div>

            {/* Main Slider */}
            <div className="flex-1 relative rounded-2xl overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-2000 ${currentSlide === index
                            ? "opacity-100 translate-x-0"
                            : index < currentSlide
                                ? "opacity-0 -translate-x-full"
                                : "opacity-0 translate-x-full"
                            }`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-top"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 py-4 px-12">
                                <h2 className="text-2xl font-bold text-white font-playfair-display">
                                    {slide.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}



            </div>
        </div>
    );
}


const Comment = ({ story }) => {

    return (
        <div className='flex gap-2 h-72  flex-col justify-between px-2 bg-(--color1) hover:opacity-80 text-(--color2) p-2'  >

            <div className="grow text-justify" >
                {story.comment}
            </div>

            <div className="flex gap-2 items-center" >
                <div className={`w-18 h-18 rounded-full  bg-cover bg-top`} style={{ backgroundImage: `url(${story.image})` }} />
                <div className="text-sm" >
                    {story.name} <br />
                    {story.scholarship} <br />
                    {story.university}
                </div>
            </div>

        </div>
    )
}


const items = stories;

// horizontal slide, no scroll bar, no auto-slide


export const Slide14 = () => {
    const { screen } = useNavContext()
    const totalSlides = items?.length;
    const [index, setIndex] = useState(0);
    const [ visibleSlides, setVisibleSlides ] = useState(1)
    const [ maxIndex, setMaxIndex ] = useState( totalSlides - 1 )

    useEffect(() => {
        setIndex(0)
        let visible = 1;
        if( screen.width > 1024 ) visible=4;
        else if( screen.width > 640 ) visible=2;
        
        
        setVisibleSlides(visible);

        let maxi = totalSlides - visible;
        setMaxIndex( maxi );
        

    }, [ screen.width ])
    
    

    
    

    const slideLeft = () => {
        setIndex(prev => Math.max(prev - 1, 0));
    };

    const slideRight = () => {
        setIndex(prev => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className="relative w-full flex items-center">
            {/* Left Button */}

            <div className="absolute right-2 -top-2"  >
            <button
                onClick={slideLeft}
                disabled={index === 0}
                className="z-10 bg-(--color1) text-(--color2) px-3 py-2 disabled:opacity-20"
            >
                ◀
            </button>

            <button
                onClick={slideRight}
                disabled={index === maxIndex}
                className="z-10 bg-(--color1) text-(--color2) px-3 py-2 disabled:opacity-20"
            >
                ▶
            </button>
            </div>

            {/* Viewport */}
            <div className="overflow-hidden w-full mt-6">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${index * ( 100 / visibleSlides ) }%)`
                    }}
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`shrink-0 p-2`} style={{ width: `${ 100 / visibleSlides }%` }}
                        >
                            
                            <Comment story={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Button */}
            
        </div>
    );
};