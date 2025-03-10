import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";
import AdminDashboard from "./AdminDashboard";
import UserPermissions from "./UserPermissions";
import WaitingPage from "./Waitingpage";
import CreateMonth from "./AddMonth";
import ViewAllMonths from "./ViewMonths";
import CreateBudgetPlan from "./AddBudget"
import ViewBudgetPlans from "./ViewBudgets";
import UpdateBudgetPlan from "./UpdateBudgets";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user-permissions" element={<UserPermissions />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/addmonth" element={<CreateMonth />} />
          <Route path="/viewmonth" element={<ViewAllMonths />} />
          <Route path="/viewbudget" element={<ViewBudgetPlans />} />
          <Route path="/addbudget" element={<CreateBudgetPlan />} />
          <Route path="/updatebudget/:id" element={<UpdateBudgetPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
