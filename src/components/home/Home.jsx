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

  const [resumes, setResumes] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const resumesPerPage = 5;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchResumes = async () => {
        try {
            const response = await axios.get('https://resume-builder-app-aooz.onrender.com/getResumes');
            console.log('Fetched resumes:', response.data); // Log fetched resumes

            const resumesWithUserInfo = await Promise.all(response.data.map(async (resume) => {
                if (resume.createdBy) {
                    try {
                        const userResponse = await axios.get(`https://resume-builder-app-aooz.onrender.com/user/${resume.createdBy}`);
                        return { ...resume, creatorName: userResponse.data.name };
                    } catch (userError) {
                        console.error(`Error fetching user for resume ${resume._id}:`, userError);
                        return { ...resume, creatorName: 'Unknown' }; // Handle error by setting a default name
                    }
                } else {
                    console.warn(`Resume ${resume._id} is missing createdBy field`); // Log missing createdBy
                    return { ...resume, creatorName: 'Unknown' };
                }
            }));
            setResumes(resumesWithUserInfo);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Session expired, please login again.');
                navigate('/login');
            } else {
                console.error('Error fetching resumes:', error);
            }
        }
    };

    fetchResumes();
}, [navigate]);



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://resume-builder-app-aooz.onrender.com/logout', {}, { withCredentials: true });
      alert("Logout successfully");
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error making logout request:', error);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`https://resume-builder-app-aooz.onrender.com/download/${id}`);
      const url = response.data.presignedUrl;
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume_${id}.pdf`;
      link.click();
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://resume-builder-app-aooz.onrender.com/delete/${id}`);
      setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0) : 'G';
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredResumes = resumes.filter((resume) =>
    searchTerm === '' || (resume.name && resume.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastResume = currentPage * resumesPerPage;
  const indexOfFirstResume = indexOfLastResume - resumesPerPage;
  const currentResumes = filteredResumes.slice(indexOfFirstResume, indexOfLastResume);

  const totalPages = Math.ceil(filteredResumes.length / resumesPerPage);

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
            <input
              type="text"
              placeholder="Search resume"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="create-btn" onClick={() => navigate('/resume')}>Create Resume</button>
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
              {currentResumes.map((resume) => (
                <tr key={resume._id}>
                  <td>{resume.name || 'No Name'}</td> {/* Handle blank names */}
                  <td>{resume.designation}</td>
                  <td>{resume.skills.join(', ')}</td>
                  <td>{resume.creatorName?resume.creatorName:user.name}</td>
                  <td>
                    <button className="action-btn download" onClick={() => handleDownload(resume._id)}>Download</button>
                    <button className="action-btn delete" onClick={() => handleDelete(resume._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={currentPage === page + 1 ? 'active' : ''}
              >
                {page + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '<' : '>'}
      </button>
    </div>
  );
}

export default Home;
