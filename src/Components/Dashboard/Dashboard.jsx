import React from "react";
import Profile from "../Profile/Profile.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import './Dashboard.css';

const Dashboard = ({ user, schedule, setSchedule }) => {

    return (
        <div className="Dashboard">
            <div className="Dashboard__container">
                <Schedule user={user} schedule={schedule} setSchedule={setSchedule}/>
                <Profile user={user}/>
            </div>
        </div>
    )

}

export default Dashboard;