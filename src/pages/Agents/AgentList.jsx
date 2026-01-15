import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AgentList = () => {
            const [agents, setAgents] = useState([]);
            const [loading, setLoading] = useState(true);
            useEffect(()=>{
const fetchAgents = async () =>{
    try{
const response = await axios.get("https://backend-anvaya-crm.vercel.app/agents")
setAgents(response.data)
    }catch(error){
      console.error("Error fetching agents:", error);
    }finally {
        setLoading(false);
      }
}
fetchAgents()
            },[])
         if (loading) return <h3>Loading...</h3>   
return (
    <div className="page">
      <div className="page-header">
        <h2>Sales Agent Management</h2>

        <Link to="/agents/new" className="btn-primary">
          + Add New Agent
        </Link>
      </div>

      <div className="list">
        {agents.map(agent => (
          <div key={agent._id} className="agent-list-item">
            <strong>{agent.name}</strong>
            <span>{agent.email}</span>
            <Link to={`/agents/${agent._id}/leads`} className="leads-link">
  View Leads
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentList;
