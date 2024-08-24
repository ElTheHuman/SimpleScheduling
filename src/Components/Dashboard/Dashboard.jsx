import React from "react";
import Profile from "../Profile/Profile.jsx";
import './Dashboard.css';

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <div className="Dashboard__container">
                <div className="Dashboard__schedule">
                    schedule
                </div>
                <Profile />
            </div>
        </div>
    )

}

export default Dashboard;