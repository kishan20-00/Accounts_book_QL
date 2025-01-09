import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";
import AdminDashboard from "./AdminDashboard";
import UserPermissions from "./UserPermissions";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user-permissions" element={<UserPermissions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
