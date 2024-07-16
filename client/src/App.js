import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpForm';
import UserLoginPage from './components/UserLoginPage';
import LogNewComplaintPage from './components/LogNewComplaintPage';
import ViewComplaints from './components/ViewComplaints';
import OfficialLoginPage from './components/OfficialLoginPage';
import PoliceLoginPage from './components/PoliceLoginPage';
import HQLoginPage from './components/HQLoginPage';
import ComplaintDetails from './components/ComplaintDetails';
import AddedPoliceOfficerDetails from './components/AddedPoliceOfficerDetails';
// index.js or App.js
// import 'antd/dist/antd.css';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/user-login" element={<UserLoginPage />} />
              <Route path="/log-complaint" element={<LogNewComplaintPage />} />
              <Route path="/view-complaints" element={<ViewComplaints />} />
              <Route path="/official-login" element={<OfficialLoginPage />} />
              <Route path="/police-login" element={<PoliceLoginPage />} />
              <Route path="/hq-login" element={<HQLoginPage />} />
              <Route path="/complaint-details/:id" element={<ComplaintDetails />} />
              <Route path="/police-officer-details" element={<AddedPoliceOfficerDetails />} />
            </Route>
        </Routes>
      </div>
  );
}

export default App;
