import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

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
//   { name: "New", value: 6 },
//   { name: "Contacted", value: 4 },
//   { name: "Qualified", value: 3 },
//   { name: "Closed", value: 7 }
// ];

const closedVsPipelineColors = ["#22c55e", "#f97316"];
const statusColors = ["#22c55e", "#ef4444", "#f97316", "#4f46e5", ];

const Reports = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
        try{
const res = await axios.get("https://backend-anvaya-crm.vercel.app/leads");
      setLeads(res.data);
        }catch(error){
console.error(error);
        }finally {
        setLoading(false);
      }
      
    };
    fetchLeads();
  }, []);
  const closedCount = leads.filter(l => l.status === "Closed").length;
const pipelineCount = leads.filter(l => l.status !== "Closed").length;

const pipelineData = [
  { name: "Closed", value: closedCount },
  { name: "In Pipeline", value: pipelineCount }
];

const agentMap = {};

leads
  .filter(l => l.status === "Closed")
  .forEach(lead => {
    const agentName = lead.salesAgent?.name || "Unknown";
    agentMap[agentName] = (agentMap[agentName] || 0) + 1;
  });

const agentData = Object.entries(agentMap).map(
  ([agent, leads]) => ({ agent, leads })
);

const statusMap = {};

leads.forEach(lead => {
  statusMap[lead.status] = (statusMap[lead.status] || 0) + 1;
});

const statusData = Object.entries(statusMap).map(
  ([name, value]) => ({ name, value })
);

if (loading) return <h3>Loading...</h3>;
  return (
  <div
//    style={{
//     display: "block",        // ❌ override flex
//     width: "100%",
//     padding: "0",
//     margin: "0",
//     backgroundColor: "#f9fafb"
//   }}
style={{ width: "100%", height: "300px" }}
  > 
      <h2>Anvaya CRM Reports</h2>
    <div className="report-page">

      {/* Closed vs Pipeline */}
      <section className="report-card">
        <h4>Total Leads: Closed vs Pipeline</h4>
        <Pie
          data={{
            labels: pipelineData.map(d => d.name),
            datasets: [
              {
                data: pipelineData.map(d => d.value),
                backgroundColor: closedVsPipelineColors
              }
            ]
          }}
        />
      </section>

      {/* Leads Closed by Agent */}
      <section className="report-card">
        <h4>Leads Closed by Sales Agent</h4>
        <Bar
          data={{
            labels: agentData.map(d => d.agent),
            datasets: [
              {
                label: "Leads Closed",
                data: agentData.map(d => d.leads),
                backgroundColor: "#22c55e"
              }
            ]
          }}
          options={{
            responsive: true,
            // plugins: {
            //   legend: { display: true }
            // }
          }}
        />
      </section>

      {/* Lead Status Distribution */}
      <section className="report-card">
        <h4>Lead Status Distribution</h4>
        <Pie
          data={{
            labels: statusData.map(d => d.name),
            datasets: [
              {
                data: statusData.map(d => d.value),
                backgroundColor: statusColors
              }
            ]
          }}
        />
      </section>
    </div>
    </div>
  );
};

export default Reports;

