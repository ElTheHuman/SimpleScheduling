import React from "react";
import Profile from "../Profile/Profile.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import './Dashboard.css';

const Dashboard = ({ user }) => {

    return (
        <div className="Dashboard">
            <div className="Dashboard__container">
                <Schedule user={user}/>
                <Profile user={user}/>
            </div>
        </div>
    )

}

export default Dashboard;