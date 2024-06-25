import React from 'react';
// import './App.css';
import Header from './components/header/Header';
import Body from './components/body/Body'
import Signup from './components/signup/Signup';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/resume' element={<div>
          <Header/>
          <Body/>
          
        </div>}/>
        
      </Routes>
    </Router>
    // <div className="App">

    //   <Header/>
    //   <Body/>
    // </div>
  )
}

export default App;
