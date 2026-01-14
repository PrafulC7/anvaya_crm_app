import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AgentLeads = () => {
const [agents, setAgents] = useState([]);
const [leadsData, setLeadsData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
 const fetchAgents = async () =>{
     try{
 const response = await axios.get("https://backend-anvaya-crm.vercel.app/agents")
 setAgents(response.data)
     }catch(error){
       console.error("Error fetching agents:", error);
     }
 }
 fetchAgents()
             },[])

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
  const { agentId } = useParams();

  const selectedAgent = agents.find(
    agent => agent._id === agentId
  );
  let leads = leadsData.filter(lead => lead.salesAgent?._id === agentId);
  if (statusFilter) {
    leads = leads.filter(lead => lead.status === statusFilter);
  }

  if (priorityFilter) {
    leads = leads.filter(lead => lead.priority === priorityFilter);
  }

  if (sortBy === "time") {
    leads = [...leads].sort(
      (a, b) => a.timeToClose - b.timeToClose
    );
  }
if (loading) return <h3>Loading...</h3>;
  return (
    <div className="page">
      <h2>Leads by Sales Agent</h2>
      <h4>Sales Agent: {selectedAgent ? selectedAgent.name : "Loading..."}</h4>

      {/* Lead List */}
      <div className="list">
        {leads.length > 0 ? (
          leads.map(lead => (
             <div key={lead._id} className="list-item">
               <strong>{lead.name}</strong>
               <span>Status: {lead.status}</span>
               <span>Priority: {lead.priority}</span>
             </div>
           ))
         ) : (
           <h3>No leads found</h3>
         )}
       </div>

       {/* Filters */}
      <div className="filters">
        <select onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Filter by Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Proposal Sent</option>
          <option>Closed</option>
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

export default AgentLeads;



