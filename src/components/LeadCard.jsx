import React from 'react'
import { Link } from "react-router-dom";

const LeadCard = ({ lead }) => {

  return (
    <Link to={`/leads/${lead._id}`} className="lead-card" aria-label={`View details for ${lead.name}`}>
  <h4>{lead.name}</h4>
  <p>Status: {lead.status}</p>

      <span className={`badge ${lead.status.toLowerCase()}`}>
        {lead.priority}
      </span>
    </Link>
  );
};

export default LeadCard;