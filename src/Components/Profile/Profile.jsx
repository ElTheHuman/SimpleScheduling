import React from "react";
import './Profile.css';

const Profile = ({ user }) => {

    return (
        <div className="Profile">
            <div className="Profile__container">
                <div className="Profile__header">
                    <div className="Profile__name">{user.name}</div>
                </div>
                <div className="Profile__content">
                    <div className="Profile__position">{user.position}</div>
                    <div className="Profile__region">{user.region}</div>
                    <div className="Profile__district">{user.district}</div>
                </div>
            </div>
        </div>
    )

}

export default Profile;