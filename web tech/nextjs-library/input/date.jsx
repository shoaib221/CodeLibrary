import { useEffect, useState } from "react";
import './date.css'


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


export const TimeSpan = ({ set }) => {

    const [time, setTime] = useState(null);

    useEffect(() => {

        async function Do(params) {
            const now = new Date();
            setTime({
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate(),
                hour: now.getHours(),
            });
        }

        Do()

    }, []);



    useEffect(() => {
        if (!time) return
        set(new Date(time.year, time.month - 1, time.date, time.hour))
    }, [time, set])

    if (!time) return null; // prevents mismatch

    return (
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 justify-between' >
            <label >
                Year <br />
                <input
                    value={time.year} onChange={(e) => setTime(prev => { return { ...prev, year: e.target.value } })}
                    type='number' placeholder='i.g. 2025' className='date-input-a' />
            </label>
            

            <label >
                Month <br />
                <input
                    value={time.month} onChange={(e) => setTime(prev => { return { ...prev, month: e.target.value } })}
                    type='number' placeholder='i.g. 11' className='date-input-a' />
            </label>
            

            <label >
                Date <br />
                <input
                    value={time.date} onChange={(e) => setTime(prev => { return { ...prev, date: e.target.value } })}
                    type='number' placeholder='i.g. 31' className='date-input-a' />
            </label>
            

            <label >
                Hour <br />
                <input
                    value={time.hour} onChange={(e) => setTime(prev => { return { ...prev, hour: e.target.value } })}
                    type='number' placeholder='i.g. 19' className='date-input-a' />
            </label>

        </div>
    )
}