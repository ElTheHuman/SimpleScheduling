import React from "react";
import './Profile.css';
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {

    const navigateTo = useNavigate();

    const handleSignOut = () => {
        navigateTo('/');
    }

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
                <button className="Profile__sign-out" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    )

}

export default Profile;