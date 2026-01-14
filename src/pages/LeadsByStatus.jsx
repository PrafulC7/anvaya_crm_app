import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LeadsByStatus = () => {
  const { status } = useParams();

  const [agents, setAgents] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios.get("https://backend-anvaya-crm.vercel.app/agents")
      .then(res => setAgents(res.data));
  }, []);

  useEffect(() => {
    axios.get("https://backend-anvaya-crm.vercel.app/leads")
      .then(res => setLeadsData(res.data));
  }, []);

  useEffect(() => {
    if (status) setSelectedStatus(status);
  }, [status]);

  let leads = leadsData;

  // ✅ MAIN filter: Status
  if (selectedStatus) {
    leads = leads.filter(
      lead => lead.status === selectedStatus
    );
  }

  // ✅ Agent filter
  if (selectedAgentId) {
    leads = leads.filter(
      lead => lead.salesAgent?._id === selectedAgentId
    );
  }

  // ✅ Priority filter
  if (priorityFilter) {
    leads = leads.filter(
      lead => lead.priority === priorityFilter
    );
  }

  // ✅ Sorting
  if (sortBy === "time") {
    leads = [...leads].sort(
      (a, b) => a.timeToClose - b.timeToClose
    );
  }

  return (
    <div className="page">
      <h2>Lead List By Status</h2>
      {selectedStatus && <h4>Status: {selectedStatus}</h4>}

      <div className="list">
        {leads.length > 0 ? (
          leads.map(lead => (
            <div key={lead._id} className="list-item">
              <strong>{lead.name}</strong>
              <span>Sales Agent: {lead.salesAgent?.name}</span>
              {/* <span>Priority: {lead.priority}</span> */}
            </div>
          ))
        ) : (
          <h3>No leads found</h3>
        )}
      </div>

      <div className="filters">
        <select
          value={selectedAgentId}
          onChange={e => setSelectedAgentId(e.target.value)}
        >
          <option value="">All Agents</option>
          {agents.map(agent => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        <select onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">Filter by Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select onChange={e => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="time">Time to Close</option>
        </select>
      </div>
    </div>
  );
};
export default LeadsByStatus;


