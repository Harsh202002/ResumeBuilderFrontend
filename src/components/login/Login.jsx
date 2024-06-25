// src/components/Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../../userContext';
import netfotechLogo from "../../Assets/Netfotech logo.png"; // Import the logo

export default function Login() {
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });

    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9002/login", userInput)
            .then(res => {
                alert(res.data.message);
                if (res.data.user) {
                    setUser(res.data.user);  // Set the user data
                    navigate('/home');
                }
            })
            .catch(err => {
                console.error("Login error:", err);
            });
    };

    return (
        <section className="login">
            <div className="imgBx">
                <img src={netfotechLogo} alt="Logo" /> {/* Use the imported logo */}
            </div>
            <div className="contentBx">
                <div className="formBx">
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <div className="inputBx">
                            <span>Email Id</span>
                            <input type="email" name="email" value={userInput.email} required onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <span>Password</span>
                            <input type="Password" name="password" value={userInput.password} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Sign in" />
                        </div>
                        <div className="inputBx">
                            <p>Don't have an account? <Link to="/">Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
