import React, { useState } from "react";
import { Alert } from "@mui/material";
import UserData from '../../SimpleDatabase/UserData/userdata.json';
import './SignIn.css'
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigateTo = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        setShowError(false);

        // Linear search for searching user data
        let user;
        for (let i = 0; i < UserData.length; i++) {
            if (UserData[i][email] && !UserData[i][email]['password'].localeCompare(password)) {
                // skip password collection
                const {password, ...data} = UserData[i][email];
                user = data;
            }
        }

        if (!user) {
            setShowError(true);
            return;
        }

        navigateTo('/dashboard');

    }

    return (
        <div className="SignIn">
            <div className="SignIn__container">
                <div className="SignIn__header">Sign In</div>
                <div className="SignIn__form-container">
                    <Alert severity="error" className={"SignIn__error " + (showError ? "SignIn__error--active": "SignIn__error--disabled")}>
                        <p className="SignIn__error-message">Sign In Failed</p>
                    </Alert>
                    <form className="SignIn__form" onSubmit={handleSubmit}>
                        <div className="SignIn__input-container">
                            <label htmlFor="email" className="SignIn__input-label">Email</label>
                            <input type="email" name="email" id="email" className="SignIn__input" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="SignIn__input-container">
                            <label htmlFor="password" className="SignIn__input-label">Password</label>
                            <input type="password" name="password" id="password" className="SignIn__input" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" className="SignIn__submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;