import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";

const LeadDetails = () => {
        const [leadsData, setLeadsData] = useState([]);
        const [loading, setLoading] = useState(true);
          const [comments, setComments] = useState([]);
          const [isEditing, setIsEditing] = useState(false);
          const [agents, setAgents] = useState([]);
const [editData, setEditData] = useState({
  name: "",
  source: "",
  salesAgent: "",
  status: "",
  priority: "",
  timeToClose: ""
});
const { id } = useParams();

useEffect(() => {
  const fetchAgents = async () => {
    try {
      const res = await axios.get("https://backend-anvaya-crm.vercel.app/agents");
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents", error);
    }
  };

  fetchAgents();
}, []);

useEffect(() => {
  const fetchLeads = async () => {
    try {
      const response = await axios.get("https://backend-anvaya-crm.vercel.app/leads");
      setLeadsData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchLeads();
}, []);

useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://backend-anvaya-crm.vercel.app/leads/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
    //  finally {
    //   setLoading(false);
    // }
  };
  fetchComments();
}, [comments]);

  const lead = leadsData.find((l) => l._id === (id));

 useEffect(() => {
  if (!lead) return;
    setEditData({
      name: lead.name,
      source: lead.source,
      salesAgent: lead.salesAgent?._id,
      status: lead.status,
      priority: lead.priority,
      timeToClose: lead.timeToClose
    });
}, [lead]);
    
if (loading) return <h3>Loading...</h3>;

if (!lead) return <p>Lead not found</p>;

 

const handleEditChange = (e) => {
  const { name, value, type } = e.target;

  setEditData(prev => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value
  }));
};

const handleUpdate = async () => {
  try {
    const response = await axios.put(
      `https://backend-anvaya-crm.vercel.app/leads/${lead._id}`,
      editData
    );
//  console.log("Updated lead:", response.data);
    setLeadsData(prev =>
      prev.map(l => (l._id === id ? response.data : l))
    );
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating lead:", error.response?.data || error.message);
  }
};


  return (
    <div className="lead-details-page">
      <h1>Lead Management: {lead.name}</h1>

      {/* Lead Info */}
      <div className="lead-info-card">
  {!isEditing ? (
    <>
      <p><strong>Lead Name:</strong> {lead.name}</p>
      <p><strong>Sales Agent:</strong> {lead.salesAgent.name}</p>
      <p><strong>Lead Source:</strong> {lead.source}</p>
      <p><strong>Lead Status:</strong> {lead.status}</p>
      <p><strong>Priority:</strong> {lead.priority}</p>
      <p><strong>Time to Close:</strong> {lead.timeToClose} Days</p>

      <button className="edit-btn" onClick={() => setIsEditing(true)}>
        Edit Lead Details
      </button>
    </>
  ) : (
    <>
      <input
        name="name"
        value={editData.name}
        onChange={handleEditChange}
      /><br/><br/>

<select
  name="source"
  value={editData.source}
  onChange={handleEditChange}
>
  <option value="">Select Source</option>
  <option value="Website">Website</option>
  <option value="Referral">Referral</option>
  <option value="Cold Call">Cold Call</option>
</select><br/><br/>

<select
  name="salesAgent"
  value={editData.salesAgent}
  onChange={handleEditChange}
>
  <option value="">Select Agent</option>
  {agents.map(agent => (
    <option key={agent._id} value={agent._id}>
      {agent.name}
    </option>
  ))}
</select><br/><br/>

      <select
        name="status"
        value={editData.status}
        onChange={handleEditChange}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Closed</option>
      </select><br/><br/>

      <select
        name="priority"
        value={editData.priority}
        onChange={handleEditChange}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select><br/><br/>

      <input
        type="number"
        name="timeToClose"
        value={editData.timeToClose}
        onChange={handleEditChange}
      /><br/><br/>

      <div className="edit-actions">
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </>
  )}
</div>


      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
{comments.length === 0 ? (
  <p>No comments yet.</p>
) : (
    comments.map((comment) => (
          <div key={comment._id} className="comment">
            <small>
              <strong>{comment.author.name}</strong> • {new Date(comment.createdAt).toLocaleString()}
            </small>
            <p>{comment.commentText}</p>
          </div>
        )))}

        {lead?.salesAgent && (
            <CommentBox setComments={setComments} authorId={lead.salesAgent._id} />
        )}
      </div>
    </div>
  );
};

export default LeadDetails;
