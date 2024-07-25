// src/components/Login.jsx
import React, { useState } from "react";
import styles from "./Login.module.css";
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
        axios.post( "https://resume-builder-app-aooz.onrender.com/login", userInput)
       // "https://resume-builder-app-aooz.onrender.com/login"
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
        <section className={styles.login}>
            <div className={styles.imgBx}>
                <img src={netfotechLogo} alt="Logo" /> {/* Use the imported logo */}
            </div>
            <div className={styles.contentBx}>
                <div className={styles.formBx}>
                    <h2>Login</h2>
                    <form onSubmit={login}>
                        <div className={styles.inputBx}>
                            <span>Email Id</span>
                            <input type="email" name="email" value={userInput.email} required onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <span>Password</span>
                            <input type="Password" name="password" value={userInput.password} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="submit" value="Sign in" />
                        </div>
                        <div className={styles.inputBx}>
                            <p>Don't have an account? <Link to="/">Signup</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
