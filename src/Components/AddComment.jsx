import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { postNewComment } from "../utils/api";

export const AddComment = ({ article_id , handleCommentPost }) => {
  const { user } = useContext(UserContext);

  const [commentPosted, setCommentPosted] = useState(false);

  const navigate = useNavigate();

  const [comment, setComment] = useState({
    username: user.username,
    body: "",
  });

  const handleChange = (e) => {
    setComment((prevComment) => {
      return { ...prevComment, body: e.target.value };
    });
  };

  useEffect(() => {
    if (user.username) {
      setComment((prevComment) => ({
        ...prevComment,
        username: user.username,
      }));
    }
  }, [user.username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username) {
      alert("Please Log In");
      navigate("/login");
      return;
    }
    if (comment.body.trim().length === 0) {
      alert("Comment can not be empty");
      return;
    }
    setCommentPosted(true);
    postNewComment(article_id, comment)
      .then((newComment) => {
        setComment({
          username: user.username,
          body: "",
        });
        handleCommentPost();
      })
      .catch((error) => {
        alert("failed to post");
      })
      .finally(() => {
        setCommentPosted(false);
      });
  };

  return (
    <>
      {user.username ? (
        <div className="flex justify-center border-2  mx-8 mt-5 h-auto">
          <label className="w-full flex justify-center shadow-md">
            <form
              className="w-full max-w-3xl p-4 "
              onSubmit={handleSubmit}
              name="add-comment"
            >
              <label className="block text-xl font-semibold mb-2">
                Your Comment
              </label>
              <textarea
                className="border-2 border-black w-full h-[150px] p-2 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment here..."
                onChange={handleChange}
                value={comment.body}
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={commentPosted}
                >
                  Submit
                </button>
              </div>
            </form>
          </label>
        </div>
      ) : null}
    </>
  );
};
