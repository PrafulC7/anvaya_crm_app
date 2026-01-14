import React from 'react'

const Settings = () => {
  return (
    <div>Settings</div>
  )
}

export default Settings

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
