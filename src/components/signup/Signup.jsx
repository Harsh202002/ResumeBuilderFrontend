import React, { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { useNavigate } from 'react-router-dom';
import netfotechLogo from "../../Assets/Netfotech logo.png";

export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const register = async (event) => {
        event.preventDefault();
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password === reEnterPassword)) {
            try {
                const res = await axios.post("http://localhost:9002/signup", user);
                if (res.data.message === "User already registered") {
                    alert("User already registered");
                } else {
                    alert("Registration Successful");
                    navigate('/login');
                }
            } catch (error) {
                console.error("There was an error!", error);
                alert("Registration failed, please try again later.");
            }
        } else {
            alert("Invalid Input");
        }
    };

    return (
        <section className={styles.signup}>
            <div className={styles.imgBx}>
                <img src={netfotechLogo} alt="Logo" />
            </div>
            <div className={styles.contentBx}>
                <div className={styles.formBx}>
                    <h2>Sign Up</h2>
                    <form onSubmit={register}>
                        {error && <p className="error">{error}</p>}
                        <div className={styles.inputBx}>
                            <span>Username</span>
                            <input type="text" name="name" value={user.name} required onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <span>Email Id</span>
                            <input type="email" name="email" value={user.email} required onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <span>Password</span>
                            <input type="Password" name="password" value={user.password} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <span>ReEnter-Password</span>
                            <input type="Password" name="reEnterPassword" value={user.reEnterPassword} required pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum of 7 characters. Should have at least one special character and one number." onChange={handleChange} />
                        </div>
                        <div className={styles.inputBx}>
                            <input type="submit" value="Sign Up" />
                        </div>
                        <div className={styles.inputBx}>
                            <p>Already have an account? <a href="/login">Sign In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
