// import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Dashboard from './pages/Dashboard'
import LeadDetails from "./pages/LeadDetails";
import Reports from './pages/Reports'
import Sidebar from "./components/Sidebar"
// import Settings from "./pages/Settings";
import LeadList from "./pages/LeadList";
import AddLead from "./pages/AddLead";
import AgentList from "./pages/Agents/AgentList";
import AddAgent from "./pages/Agents/AddAgent";
import AgentLeads from "./pages/Agents/AgentLeads";
import LeadsByStatus from "./pages/LeadsByStatus";

function App() {

  return (
    <>
      <Router>
  <div className="app-layout">
        <Sidebar />
<div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadList />} />
            <Route path="/leads/status/:status" element={<LeadsByStatus />} />
             <Route path="/leads/:id" element={<LeadDetails />} />
             <Route path="/leads/new" element={<AddLead />} />
             <Route path="/agents" element={<AgentList />} />
          <Route path="/agents/new" element={<AddAgent />} />
          <Route path="/agents/:agentId/leads" element={<AgentLeads />} />

            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
</Router>
    </>
  )
}

export default App
