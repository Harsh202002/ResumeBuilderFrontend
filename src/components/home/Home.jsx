import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../userContext';
import axios from 'axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate('/login');
    }
  }, [user, navigate]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = (event) => {
    event.preventDefault();
    axios.post('https://resume-builder-app-aooz.onrender.com/logout')
    .then(response => {
      alert("logout succesfully")
    })
    .catch(error => {
      console.error('Error making logout request:', error);
    });
    setUser(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCreateResume = (event) => {
    event.preventDefault();
    navigate('/resume');
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [resumes, setResumes] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('https://resume-builder-app-aooz.onrender.com/getResumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`https://resume-builder-app-aooz.onrender.com/download/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://resume-builder-app-aooz.onrender.com/delete/${id}`);
      setResumes(resumes.filter(resume => resume._id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };
  const getInitial = (name) => {
    return name ? name.charAt(0) : 'G';
  };

  return (
    <div className="h-container">
      <header className='h-header'>
        <div className='hamburger-d'>
      <button className="hamburger-menu" onClick={toggleSidebar}>
          &#9776;
        </button>
        </div>
        <div className='h1-head'>
        <h1>Welcome, {user ? user.name : 'Guest'}</h1>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <span className="logout-icon"></span> {getInitial(user ? user.name : 'Guest')}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <div className="h-content">
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <h2>Netfotech Solutions</h2>
          <p>Turns Ideas Into Reality</p>
        </div>
        <div className="h-main">
          <h2>Resume</h2>
          <div className="search-create">
            <input type="text" placeholder="Search resume" />
            <button className="create-btn" onClick={handleCreateResume}>Create Resume</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Skills</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume._id}>
                  <td>{resume.name}</td>
                  <td>{resume.designation}</td>
                  <td>{resume.skills.join(', ')}</td>
                  <td>{user ? user.name : 'Guest'}</td>
                  <td>
                    <button className="action-btn download" onClick={() => handleDownload(resume._id)}>Download</button>
                    <button className="action-btn delete" onClick={() => handleDelete(resume._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        {sidebarOpen ? '<' : '>'}
      </button>
    </div>
  );
}

export default Home;
