import axios from "axios";
import { useEffect, useState } from "react";

const Settings = () => {
  const [agents, setAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 true initially

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [agentsRes, leadsRes] = await Promise.all([
        axios.get("https://backend-anvaya-crm.vercel.app/agents"),
        axios.get("https://backend-anvaya-crm.vercel.app/leads")
      ]);

      setAgents(agentsRes.data);
      setLeads(leadsRes.data);
    } catch (err) {
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      setLoading(true);

      await axios.delete(
        `https://backend-anvaya-crm.vercel.app/${type}/${id}`
      );

      if (type === "agents") {
        setAgents(prev => prev.filter(a => a._id !== id));
      } else {
        setLeads(prev => prev.filter(l => l._id !== id));
      }

      alert("Deleted successfully");
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOADING UI
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="settings-page">
      <h2>⚙️ Settings</h2>

      <div className="settings-section">
        <h3>Agents</h3>
        {agents.length === 0 ? (
          <p>No agents found</p>
        ) : (
          agents.map(agent => (
            <div key={agent._id} className="settings-item">
              <span>{agent.name} ({agent.email})</span>
              <button
                onClick={() => handleDelete("agents", agent._id)}
                disabled={loading}
                className="danger-btn"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="settings-section">
        <h3>Leads</h3>
        {leads.length === 0 ? (
          <p>No leads found</p>
        ) : (
          leads.map(lead => (
            <div key={lead._id} className="settings-item">
              <span>{lead.name}</span>
              <button
                onClick={() => handleDelete("leads", lead._id)}
                disabled={loading}
                className="danger-btn"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Settings;



// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend
// } from "recharts";

// const pipelineData = [
//   { name: "Closed", value: 12 },
//   { name: "In Pipeline", value: 8 }
// ];

// const agentData = [
//   { agent: "John Doe", leads: 5 },
//   { agent: "Jane Smith", leads: 4 },
//   { agent: "Mark Lee", leads: 3 }
// ];

// const statusData = [
//   { name: "New", value: 6 }, //red
//   { name: "Contacted", value: 4 }, //purple
//   { name: "Qualified", value: 3 }, //orange
//   { name: "Closed", value: 7 } //green
// ];

// const closedVsPipeline = ["#22c55e", "#f97316",];
// const COLORS = ["#ef4444", "#f97316", "#4f46e5", "#22c55e",];

// const Reports = () => {
//   return (
//     <div className="page">
//       <h2>Anvaya CRM Reports</h2>

//       {/* Leads Closed vs Pipeline */}
//       <section className="report-card">
//         <h4>Total Leads: Closed vs Pipeline</h4>
//         <PieChart width={300} height={300}>
//           <Pie
//             data={pipelineData}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             dataKey="value"
//             label
//           >
//             {pipelineData.map((_, index) => (
//               <Cell key={index} fill={closedVsPipeline[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </section>

//       {/* Leads Closed by Agent */}
//       <section className="report-card">
//         <h4>Leads Closed by Sales Agent</h4>
//         <BarChart width={500} height={300} data={agentData}>
//           <XAxis dataKey="agent" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="leads" fill="#22c55e" />
//         </BarChart>
//       </section>

//       {/* Lead Status Distribution */}
//       <section className="report-card">
//         <h4>Lead Status Distribution</h4>
//         <PieChart width={300} height={300}>
//           <Pie
//             data={statusData}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             dataKey="value"
//             label
//           >
//             {statusData.map((_, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </section>
//     </div>
//   );
// };

// export default Reports;
