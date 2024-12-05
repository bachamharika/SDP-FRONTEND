import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import StudentDashboard from './Student/StudentDashboard';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/ManageUsers';
import PostScholarship from './Admin/PostScholarship';
import ManageScholarship from './Admin/ManageScholarship'
import ApplyApplication from './Student/ApplyApplication';
import MyApplications from './Student/MyApplications';
import UpdateProfile from './Student/updateProfile';
import ScholarshipApplications from './Admin/ScholarshipApplications';

function App() {
  return (
    <Router>
      <div className="App">
       
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route  path="/scholarships" element={<h2>Scholarships Page</h2>}/>
            <Route path="/applications" element={<h2>Applications Page</h2>}/>
            <Route path="/profile"  element={<h2>Profile Page</h2>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/studentRegister" element={<Register/>}/>
            <Route path="/studentdashboard" element={<StudentDashboard/>}/>
            <Route path="/admindashboard" element={<AdminDashboard/>}/>
            <Route path="/admin/users" element={<ManageUsers/>}/>
            <Route path="/admin/postScholarShip" element={<PostScholarship/>}/>
            <Route path="/admin/allScholarShip" element={<ManageScholarship/>}/>
            <Route path="/studentApplication" element={<ApplyApplication/>}/>
            <Route path="/viewApplications" element={<MyApplications/>}/>
            <Route path="/updateProfile" element={<UpdateProfile/>}/>
            <Route path="/admin/viewApplications" element={<ScholarshipApplications/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
