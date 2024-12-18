import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteComment,
  getCommentsOfSingleArticle,
  getSingleArticle,
  postNewComment,
  updateArticleVote,
} from "./api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CommentCard } from "./CommentCard";
import { UserContext } from "../Contexts/UserContext";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});

  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const [comment, setComment] = useState({
    username: user.username,
    body: "",
  });

  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  const [hasUpVoted, setHasUpVoted] = useState(false);

  const [hasDownVoted, setHasDownVoted] = useState(false);

  const navigate = useNavigate();

  const handleUpVote = () => {
    const body = {
      inc_vote: 1,
    };

    if (!hasUpVoted) {
      updateArticleVote(article_id, body).then(() => {
        getSingleArticle(article_id).then((data) => {
          setArticle(data);
          setHasUpVoted(true);
        });
      });
    }
  };
  const handleDownVote = () => {
    const body = {
      inc_vote: -1,
    };

    if (!hasDownVoted) {
      updateArticleVote(article_id, body).then(() => {
        getSingleArticle(article_id).then((data) => {
          setArticle(data);
          setHasDownVoted(true);
        });
      });
    }
  };

  const updateCommentVotesDisplay = (comment_id, inc_vote) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === comment_id
          ? { ...comment, votes: comment.votes + inc_vote }
          : comment
      )
    );
  };

 

  useEffect(() => {
    setLoading(true);
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .then(() => {
        setLoading(true);
        getCommentsOfSingleArticle(article_id).then((data) => {
          setComments(data);
          setLoading(false);
        });
      });
  }, [article_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.username) {
      alert("Please Log In");
      navigate("/login");
    } else {
      postNewComment(article.article_id, comment).then((newComment) => {
        setComments((prevComments) => {
          return [newComment, ...prevComments];
        });

        setComment({
          username: user.username,
          body: "",
        });
      });
    }
  };

  const handleChange = (e) => {
    setComment((prevComment) => {
      return { ...prevComment, body: e.target.value };
    });
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
        alert("Your comment has been deleted from article !!")
        setComments((prevComments) => {
            return prevComments.filter(
              (comment) => comment.comment_id !== comment_id
            );
          })
  };

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
          <div className="single-article-box">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold underline text-black">
                {article.title}
              </h1>
            </div>
            <div className="w-[750px] justify-self-center">
              <div className="flex justify-center">
                <img
                  src={article.article_img_url}
                  alt="article-image"
                  className="w-[750px] h-[500px] mt-5"
                />
              </div>
              <div className="text-start mt-2 ml-2">
                <div className="flex justify-between">
                  <p className="font-bold italic">{article.author}</p>
                  <p className="mr-2 font-bold">
                    {article.votes}{" "}
                    <span className="font-light italic">Votes</span>
                  </p>
                </div>
                <div className="flex justify-end gap-6">
                  <button className="vote-button" onClick={handleUpVote}>
                    Up
                  </button>
                  <button className="vote-button" onClick={handleDownVote}>
                    Down
                  </button>
                </div>
                <p className="font-light italic">Author,NC - News </p>
                <hr className="border-black border-1 w-[125px] mb-3 " />
              </div>
              <div className="text-start ml-2 italic">
                <p>{new Date(article.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-start ml-2 mt-2 mb-2">
                <p>{article.body}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex flex-col justify-center mt-5 border-2 mx-8 shadow-md">
          <div>
            <h1 className="text-2xl italic font-bold ml-10 mb-5 mt-2">
              Comments
            </h1>
          </div>
          {comments.map((comment) => {
            return (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                voteUpdater={updateCommentVotesDisplay}
                handleDeleteComment={handleDeleteComment}
              />
            );
          })}
        </div>
      )}

      {
        <div className="flex justify-center border-2 w-full mx-8 mt-5">
          <form className="w-full max-w-3xl p-4" onSubmit={handleSubmit}>
            <label className="block text-xl font-semibold mb-2">
              Add Comment
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
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      }
    </>
  );
};
