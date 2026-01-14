

import { useEffect, useState } from "react";

export function useDateInput() {
    const startYear = 1950;
    const endYear = new Date().getFullYear();

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [days, setDays] = useState([]);
    const [date, setDate] = useState(null)

    const daysInMonth = (m, y) => {
        if (!m || !y) return 0;
        return new Date(y, m, 0).getDate();
    };

    useEffect(() => {

        

        const elems = Array.from(
            { length: daysInMonth(month, year) },
            (_, i) => i + 1
        );

        setDays( elems );


    }, [year, month])

    const months = [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "July", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 },
    ];

    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => endYear - i
    );

    useEffect(() => {
        if( !day || !month || !year ) return;
        const elem = new Date( year, month-1, day );
        setDate(elem);
    }, [day ,month, year])


    const InputTag = () => {
        return (
            <div>

                <select value={year} onChange={(e) => setYear(e.target.value)} className="max-h-40" >
                    <option value="">Year</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>


                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Month</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>{m.name}</option>
                    ))}
                </select>


                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>



                {date && <p>Selected Date: {date.toDateString()}</p>}
            </div>
        );
    }

    return {


        date, DateInput: InputTag
    };
}