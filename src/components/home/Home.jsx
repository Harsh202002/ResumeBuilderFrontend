// src/components/Home.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext';
import "./Home.css";
import share from"../../Assets/share.png"
import share1 from "../../Assets/share (1).png"
import share2 from "../../Assets/share (2).png"

export default function Home() {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleLogout = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const handleCreateResume = (event) => {
        event.preventDefault();
        navigate('/resume');
    };

    
    const getUsernameFromEmail = (email) => {
        return email.split('@')[0];
    };

    return (
        <div>
            <nav>
                <div className="nav-title">
                    <h2>Welcome, {user ? getUsernameFromEmail(user.email) : 'Guest'}</h2>
                </div>
                <div className="button">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <main>
                <div className="db-container">
                    <div className="main-nav">
                        <div className="search">
                            <label>
                                <input type="search" />
                                <button className="search-btn">Search Resume</button>
                            </label>
                        </div>
                        <div>
                            <button className="resume-button" onClick={handleCreateResume}>Create Resume</button>
                        </div>
                    </div>
                    <div className="table-cont">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Skills</th>
                                    <th>Created By</th>
                                    <th>View</th>
                                    <th>Download</th>
                                    <th>Share</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example data, replace with actual data */}
                                <tr>
                                    <td>{user ? user.name : 'Guest'}</td>
                                    <td>Java Developer</td>
                                    <td>Java, C++</td>
                                    <td>{user ? user.name : 'Guest'}</td>
                                    <td><img src={share1} className="t-logo" alt="view" /></td>
                                    <td><img src={share2}className="t-logo" alt="download" /></td>
                                    <td><img src={share} className="t-logo" alt="share" /></td>
                                    <td><button>Delete</button></td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
