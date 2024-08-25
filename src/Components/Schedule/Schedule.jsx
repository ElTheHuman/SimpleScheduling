import React, { useEffect, useState } from "react";
import Papa from 'papaparse';
import './Schedule.css';

const Schedule = ({ user }) => {

    const [schedule, setSchedule] = useState([]);
    const [scheduleHeader, setScheduleHeader] = useState([]);
    const [canApprove, setCanApprove] = useState(false);
    const [canAddSchedule, setCanAddSchedule] = useState(false);
    const schedulePath = '../../SimpleDatabase/Schedules/schedules.csv';


    useEffect(() => {

        // Get schedules
        fetch(schedulePath)
        .then(response => response.text())
        .then(scheduleString => {
            Papa.parse(scheduleString, {
                header:true,
                delimiter: ';',
                complete: (result) => {
                    setSchedule(result.data);
                    setScheduleHeader(Object.keys(result.data[0]))
                }
            })
        });

        // Get permissions based on role

        if (user.position_code == 0) {
            setCanAddSchedule(true);
            setCanApprove(false);
        } else if (user.position_code <= 2) {
            setCanAddSchedule(false);
            setCanApprove(true);
        }

    }, [user.position_code]);

    const handleApprovalChange = (id) => {
        setSchedule(schedule => schedule.map(scheduleMap => scheduleMap.id === id ? {...scheduleMap, Approved: scheduleMap.Approved == 'Approved' ? 'Not Approved' : 'Approved'} : scheduleMap));
    }
    
    return (
        <div className="Schedule">
            <div className="Schedule__container">
                <div className="Schedule__header-container">
                    <div className="Schedule__header">Schedules</div>
                    {canAddSchedule && <button className="Schedule__add-schedule">Add schedule</button>}
                </div>
                <div className="Schedule__content">
                    <table className="Schedule__table">
                        <tbody>
                            <tr>
                                {scheduleHeader.map((header, index) => (
                                    <th key={index} className="Schedule__table--header">{header}</th>
                                ))}
                                {canApprove && <th className="Schedule__table--header">Action</th>}
                            </tr>
                            {schedule.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {scheduleHeader.map((header, colIndex) => (
                                        <td key={colIndex} className="Schedule__table--desc">{row[header]}</td>
                                    ))}
                                    {canApprove && <td className="Schedule__table--desc"><button onClick={() => handleApprovalChange(row.id)} className="Schedule__approval-change">Change Approval</button></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Schedule;