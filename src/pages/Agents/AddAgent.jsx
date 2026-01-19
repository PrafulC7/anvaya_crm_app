import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddAgent = () => {
      const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = email =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "https://backend-anvaya-crm.vercel.app/agents",
        formData
      );

      alert("Agent added successfully!");

      setFormData({ name: "", email: "" });
          navigate("/agents");

    } catch (err) {
      if (
      err.response?.status === 409 ||
      err.response?.data?.message?.toLowerCase().includes("email")
    ) {
      alert("Error adding agent. Please try again.");
    } else {
      alert("Email already exists. Please use a different email.");
    }
    } finally {
      setLoading(false);
    }    
  };


  return (
    <div className="page">
      <h2>Add New Sales Agent</h2>
{error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-agent-form">
        <input
          type="text"
          name="name"
          placeholder="Agent Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Agent Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Agent"}
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
