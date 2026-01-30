import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeadCard from "../components/LeadCard";

const Dashboard = () => {
    const [filter, setFilter] = useState("All");
    const [leadsData, setLeadsData] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchLeads = async () => {
    try {
      const response = await axios.get("https://backend-anvaya-crm.vercel.app/leads");
      setLeadsData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
    finally {
        setLoading(false);
      }
  };

  fetchLeads();
}, []);

  const filteredLeads =
    filter === "All"
      ? leadsData
      : leadsData.filter((l) => l.status === filter);

      const statusCounts = leadsData.reduce((acc, lead) => {
  acc[lead.status] = (acc[lead.status] || 0) + 1;
  return acc;
}, {});

if (loading) return <h3>Loading...</h3>;
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      {/* Lead Cards */}
      <div className="card-grid">
        {filteredLeads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
        ))}
      </div>
      
      {/* Status Summary */}
<div className="status-box">
  <h3>Lead Status</h3>

  {Object.entries(statusCounts).map(([status, count]) => (
  <p key={status}>
    <Link to={`/leads/status/${status}`} className="status-link">
      {status}: {count} {count > 1 ? "Leads" : "Lead"}
    </Link>
  </p>
))}
  
</div>

      {/* Quick Filters */}
      <div className="filters">
        <button onClick={() => setFilter("New")}>New</button>
        <button onClick={() => setFilter("Contacted")}>Contacted</button>
        <button onClick={() => setFilter("Qualified")}>Qualified</button>
        <button onClick={() => setFilter("All")}>All</button>
      </div>
      <div>
              <Link to="/leads/new" className="add-btn">
  + Add New Lead
</Link>
</div>
    </div>
  );
}

export default Dashboard

