import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddLead = () => {
        const [agents, setAgents] = useState([]);

    useEffect(() => {
  const fetchAgents = async () => {
    try {
      const response = await axios.get("https://backend-anvaya-crm.vercel.app/agents");
      setAgents(response.data);
    //   console.log(response.data)
    } catch (error) {
      console.error("Error fetching leads:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };
  fetchAgents();
}, []);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });

  const leadSources = ["Website", "Referral", "Cold Call"];
//   const salesAgents = ["John Doe", "Jane Smith", "Mark Lee"];
  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const priorities = ["High", "Medium", "Low"];
  const tagOptions = ["High Value", "Follow-up"];
//   const tagOptions = ["High Value", "Follow-up", "Urgent"];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData(prev => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value
  }));
  };

  const handleMultiSelect = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// console.log("New Lead:", JSON.stringify(formData));

 try {
  const response = await axios.post(
    "https://backend-anvaya-crm.vercel.app/leads",
    formData
  );

  console.log("Lead created:", response.data);
} catch (error) {
  console.error("Error adding lead:", error.response?.data || error.message);
}

    navigate("/leads");
  };

  return (
    <div className="add-lead-page">
      <h1>Add New Lead</h1>

      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Lead Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Lead Source
          <select name="source" onChange={handleChange} required>
            <option value="">Select Source</option>
            {leadSources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label>
         Assigned Sales Agent
         <select
           name="salesAgent"
           value={formData.salesAgent}
           onChange={handleChange}
           required
         >
           <option value="">Select agent</option>
           {agents.map((agent) => (
             <option key={agent._id} value={agent._id}>
               {agent.name}
             </option>
           ))}
         </select>
       </label>

        <label>
          Lead Status
          <select name="status" onChange={handleChange} required>
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label>
          Priority
          <select name="priority" onChange={handleChange} required>
            <option value="">Select Priority</option>
            {priorities.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <label>
          Time to Close (Days)
          <input
            type="number"
            name="timeToClose"
            value={formData.timeToClose}
            onChange={handleChange}
            required
          />
        </label>

        <label>Tags</label>
        <div className="checkbox-group">
          {tagOptions.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={formData.tags.includes(tag)}
                onChange={() => handleMultiSelect(tag, "tags")}
                required
              />
              {tag}
            </label>
          ))}
        </div>

        <button type="submit" className="add-btn">
          Create Lead
        </button>
      </form>
    </div>
  );
};

export default AddLead;
