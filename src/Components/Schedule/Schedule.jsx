import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Papa from 'papaparse';
import './Schedule.css';

const Schedule = ({ user, schedule, setSchedule }) => {

    const [canApprove, setCanApprove] = useState(false);
    const [canAddSchedule, setCanAddSchedule] = useState(false);
    const scheduleHeader = schedule.length ? Object.keys(schedule[0]) : null;
    
    useEffect(() => {

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
        setSchedule(schedule => schedule.map(scheduleMap => scheduleMap.id === id ? {...scheduleMap, Approval: scheduleMap.Approval == 'Approved' ? 'Not Approved' : 'Approved'} : scheduleMap));
    }
    
    return (
        <div className="Schedule">
            <div className="Schedule__container">
                <div className="Schedule__header-container">
                    <div className="Schedule__header">Schedules</div>
                    {canAddSchedule && <Link to={'/add-schedule'} className="Schedule__routing"><button className="Schedule__add-schedule">Add schedule</button></Link>}
                </div>
                <div className="Schedule__content">
                    <table className="Schedule__table">
                        <tbody>
                            <tr>
                                {scheduleHeader && scheduleHeader.map((header, colIndex) => {
                                    if (header == 'id' || header == 'District' || header == 'Region') {
                                        return;
                                    }
                                    return <th key={colIndex} className="Schedule__table--header">{header}</th>
                                })}
                                {canApprove && <th className="Schedule__table--header">Action</th>}
                            </tr>
                            {schedule.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {scheduleHeader.map((header, colIndex) => {
                                        if (header == 'id' || header == 'District' || header == 'Region') {
                                            return;
                                        }
                                        if (header == 'Approval') {
                                            return <td key={colIndex} className={"Schedule__table--desc " + (row[header] == 'Approved' ? "Schedule__approval--approved": "Schedule__approval--not-approved")}>{row[header]}</td>
                                        }
                                        return <td key={colIndex} className="Schedule__table--desc">{row[header]}</td>
                                    })}
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