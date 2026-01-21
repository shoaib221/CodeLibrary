import { TbBabyCarriageFilled } from "react-icons/tb";

const data1 =  [
    { photo: "/feat1.png", des: "We bring professional healthcare services directly to your doorstep.", title: "Expert Care at Home" },
    { photo: "/feat2.png", des: "Committed to delivering quality care with compassion.", title: "Skilled Professionals" },
    { photo: "/feat3.png", des: "Whether it’s an emergency or routine care, we’re available 24/7 to provide immediate support", title: "24/7 Availability" },
    { photo: "/feat4.png", des: "We have built a strong reputation for reliability and excellence in home healthcare.", title: "Trusted by Families" },
]


export const Feature1 = () => {

    return (
        <div className="grid grid-cols-[1fr_1fr]" >
            { data1.map( (elem, _)  => (
                <div key={_} >
                    <div className=" mx-auto h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${ elem.photo })` }} >

                    </div>

                    <br/>

                    <div className="header-1" > { elem.title } </div>

                    

                    <div className="text-center" > { elem.des } </div>
                    <br/>
                </div>
            )) }
        </div>
    )
}