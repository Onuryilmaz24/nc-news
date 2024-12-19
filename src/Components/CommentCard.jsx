import { useContext, useState } from "react";
import { updateCommentsVote } from "./api";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { formatter } from "../utils/dateFormat";

export const CommentCard = ({ comment, voteUpdater, handleDeleteComment }) => {
  const [hasUpVoted, setHasUpVoted] = useState(false);

  const [hasDownVoted, setHasDownVoted] = useState(false);

  

  const formattedDate = formatter.format(new Date(comment.created_at));

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleUpVote = () => {
    if (!user.username) {
      alert("Please Login In Order To Vote");
      navigate("/login");
    } else {
      const body = {
        inc_vote: 1,
      };

      if (!hasUpVoted) {
        updateCommentsVote(comment.comment_id, body).then(() => {
          setHasUpVoted(true);
          voteUpdater(comment.comment_id, 1);
        });
      }
    }
  };
  const handleDownVote = () => {
    if (!user.username) {
      alert("Please Login In Order To Vote");
      navigate("/login");
    } else {
      const body = {
        inc_vote: -1,
      };

      if (!hasDownVoted) {
        updateCommentsVote(comment.comment_id, body).then(() => {
          setHasDownVoted(true);
          voteUpdater(comment.comment_id, -1);
        });
      }
    }
  };

  const handleDeleteButton = () => {
    handleDeleteComment(comment.comment_id);
  };

  return (
    <div className="bg-gray-100 mx-1 border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
      <div className="flex justify-between font-semibold text-gray-700 mb-2">
        <span>{comment.body}</span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <div className="text-gray-800 mb-2">
        <p>{comment.body}</p>
      </div>
      <div className="text-gray-600 text-sm">
        <span>Votes: {comment.votes}</span>
      </div>

      <div className="flex justify-end gap-6">
        <div className="text-gray-600 text-sm mr-auto mt-3">
          <span className="font-bold italic">{comment.author}</span>
        </div>
        <button className="vote-button" onClick={handleUpVote}>
          Up
        </button>
        <button className="vote-button" onClick={handleDownVote}>
          Down
        </button>
        {user.username === comment.author ? (
          <button className="vote-button" onClick={handleDeleteButton}>
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
};
