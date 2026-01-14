import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const LeadList = () => {
        const [leadsData, setLeadsData] = useState([]);
        const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
  const fetchLeads = async () => {
    try {
      const response = await axios.get("https://backend-anvaya-crm.vercel.app/leads");
      setLeadsData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }finally {
        setLoading(false);
      }
  };

  fetchLeads();
}, []);

  const filteredLeads = leadsData
    .filter((lead) =>
      statusFilter ? lead.status === statusFilter : true
    )
    .filter((lead) =>
      agentFilter ? lead.salesAgent.name === agentFilter : true
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === "time") {
        return a.timeToClose - b.timeToClose;
      }
      return 0;
    });
if (loading) return <h3>Loading...</h3>;
  return (
    <div className="lead-list-page">
      <div className="list-header">
        <h1>Lead List</h1>
      </div>

      {/* Lead List */}
      <div className="lead-list">
        {filteredLeads.map((lead) => (
          <Link
            key={lead._id}
            to={`/leads/${lead._id}`}
            className="lead-row"
          >
            <span><strong>{lead.name}</strong></span>
            <span>{lead.status}</span>
            <span>{lead.salesAgent.name}</span>
          </Link>
        ))}
      </div>

      {/* Filters & Sort */}
      <div className="controls">
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Filter by Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal Sent</option>
          <option>Closed</option>
        </select>

        <select onChange={(e) => setAgentFilter(e.target.value)}>
          <option value="">Filter by Agent</option>
          {leadsData.map(lead=><option key={lead._id}>{lead.salesAgent.name}</option>)}
          {/* <option>John Doe</option>
          <option>Jane Smith</option>
          <option>Mark Twain</option> */}
        </select>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="priority">Priority</option>
          <option value="time">Time to Close</option>
        </select>
      </div>

      <Link to="/leads/new" className="add-btn">
  + Add New Lead
</Link>
    </div>
  );
};

export default LeadList;
