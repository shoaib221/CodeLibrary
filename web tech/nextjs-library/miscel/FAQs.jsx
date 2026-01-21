import { useState } from "react"

const qas = [
    
    {
        question: "How do you create a care plan?",
        answer: "We start with a detailed assessment of the client’s health, daily routine, and personal preferences. Based on this, we create a personalized care plan that can be updated anytime.",
    },
    {
        question: "How much do your caregiving services cost?",
        answer: "Costs depend on the type of care, duration, and schedule. We provide transparent pricing and will give you a clear estimate after the initial assessment.",
    },
    {
        question: "Is my loved one safe with your caregivers?",
        answer: "Absolutely. Safety is our top priority. We follow strict care protocols, conduct regular supervision, and maintain open communication with families.",
    },
    {
        question: "Do you provide short-term or temporary care?",
        answer: "Yes. We offer short-term care for recovery after surgery, illness, or when family caregivers need temporary support.",
    },
    {
        question: "How can I get started with your services?",
        answer: "Simply contact us through our website or phone. Our team will guide you through the assessment process and help you start care as quickly as possible.",
    },
];


export const FAQs = () => {


    const [ques, setQues] = useState(-1);

    const ToggleFunction = (ind) => {
        if (ques === ind) setQues(-1);
        else setQues(ind);
    }

    return (
        <div className="w-full max-w-200" >
            <div className="header-2" >FAQs</div>
            <br />
            <div className="w-full mx-auto flex flex-col gap-4 px-4" >
                {qas && qas.map((elem, index) => (
                    <div key={index} onClick={() => ToggleFunction(index)}  >
                        <div className="flex justify-between gap-4 cursor-pointer" >
                            <span className="text-justify font-bold" > {elem.question} </span>
                            <button > {index === ques ? "-" : "+"} </button>
                        </div>
                        {ques === index &&
                            <div className="px-2 text-(--color2) text-justify" > {elem.answer} </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}