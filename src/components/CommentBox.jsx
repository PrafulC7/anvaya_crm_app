import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommentBox = ({ setComments, authorId }) => {
  const { id } = useParams(); // leadId
  const [commentText, setCommentText] = useState("");
const [agents, setAgents] = useState([]);
const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState(authorId );
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("https://backend-anvaya-crm.vercel.app/agents");
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()|| !selectedAuthor) return;

    try {
      const response = await axios.post(
        `https://backend-anvaya-crm.vercel.app/leads/${id}/comments`,
        {
          author: selectedAuthor,
          commentText
        }
      );

      // Add new comment instantly to UI
      setComments(prev => [response.data, ...prev]);

      setCommentText(""); // clear input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
if (loading) return <h3>Loading Comments...</h3>;
  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <textarea
        placeholder="Add new comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />

      <div className="comment-actions">
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          required
        >
          <option value="">Select Author</option>
          {agents.map(agent => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={!commentText || !selectedAuthor}>Add Comment</button>
      </div>
    </form>
  );
};

export default CommentBox;
