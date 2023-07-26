import React, {useState} from 'react'
import {CopyToast} from "./CopyToast";
import "../App.css"

interface TimeBreak {
    timeIn: string;
    timeOut: string;
}


export const BreakTime = () => {

    const [initialTime, setInitialTime] = useState("");
    const [toggleToast, setToggleToast] = useState(false);
    const [breaks, setBreaks] = useState<TimeBreak[] | undefined>();

    function calculateBreakTimes(startTime: string): TimeBreak[] {
        const breakTimes: TimeBreak[] = [];
        const timeFormat = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/; // Regular expression to validate time format (HH:mm)

        // Validate the input time format
        if (!timeFormat.test(startTime)) {
            throw new Error('Invalid time format. Please use HH:mm format.');
        }

        // Convert the input time to minutes
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startTimeInMinutes = startHour * 60 + startMinute;

        function addTimeBreak(timeIn: number, timeOut: number) {
            breakTimes.push({
                timeIn: formatTime(timeIn),
                timeOut: formatTime(timeOut),
            });
        }

        // Calculate the break times
        addTimeBreak(startTimeInMinutes, startTimeInMinutes + 15);
        addTimeBreak(startTimeInMinutes + 16, startTimeInMinutes + 31);
        addTimeBreak(startTimeInMinutes + 32, startTimeInMinutes + 47);
        addTimeBreak(startTimeInMinutes + 48, startTimeInMinutes + 60 + 18);

        return breakTimes;
    }

    function formatTime(timeInMinutes: number): string {
        let hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;

        // Convert hours greater than 12 to 12-hour format
        hours = hours > 12 ? hours - 12 : hours;

        const formattedHours = hours < 10 ? String(hours) : String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        // Regular expression to match the format "0:00"
        const timeRegex = /^\d+:\d{2}$/;

        if (timeRegex.test(inputValue)) {
            // Input is in the correct format, update the state
            setInitialTime(inputValue);
        }
    };
    const handleClick = () => {
        setBreaks(calculateBreakTimes(initialTime))
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleClick()
        }
    };

    const showCopyToast = () => {
        setToggleToast(true)
        setTimeout(() => {
            setToggleToast(false)
        },  1000)
    }

    return (
        <>
            {toggleToast && <CopyToast/>}
            <div className="container">
                <div className="dui-form-control justify-center w-1/2 mx-auto">
                    <input
                        className="dui-input dui-input-bordered mt-2"
                        placeholder="Input beginning of break"
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <p className="dui-label-text my-2">Example Input: 1:00</p>
                    <button
                        className="dui-btn-accent mt-2 rounded-lg"
                        onClick={handleClick}
                    >
                        Calculate
                    </button>

                    <div className="overflow-x-auto">
                        <table className="dui-table">
                            {/* head */}
                            <thead>
                            <tr>
                                <th>Time In</th>
                                <th>Time Out</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* row 1 */}
                            <tr>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => { showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[0].timeIn as string)
                                }}>{breaks ? breaks[0].timeIn : null}</td>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[0].timeOut as string)
                                }}>{breaks ? breaks[0].timeOut : null}</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[1].timeIn as string)
                                }}>{breaks ? breaks[1].timeIn : null}</td>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[1].timeOut as string)
                                }}>{breaks ? breaks[1].timeOut : null}</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[2].timeIn as string)
                                }}>{breaks ? breaks[2].timeIn : null}</td>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[2].timeOut as string)
                                }}>{breaks ? breaks[2].timeOut : null}</td>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[3].timeIn as string)
                                }}>{breaks ? breaks[3].timeIn : null}</td>
                                <td className="hover:cursor-pointer hover:text-white" onClick={() => {showCopyToast()
                                    navigator.clipboard.writeText(breaks?.[3].timeOut as string)
                                }}>{breaks ? breaks[3].timeOut : null}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
