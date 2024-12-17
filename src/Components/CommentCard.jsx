

export const CommentCard = ({ comment }) => {
    

    const formattedDate = new Date(comment.created_at).toLocaleDateString();
  
    return (
      <div className="bg-gray-100 mx-20 border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
        <div className="flex justify-between font-semibold text-gray-700 mb-2">
          <span>{comment.body}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="text-gray-800 mb-2">
          <p>{comment.body}</p>
        </div>
        <div className="text-gray-600 text-sm">
          <span>Votes: {comment.votes}</span>
        </div>
      </div>
    );
  };