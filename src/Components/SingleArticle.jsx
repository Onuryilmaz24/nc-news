import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleArticle, updateArticleVote } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContext } from "../Contexts/UserContext";
import { formatter } from "../utils/dateFormat";
import { CommentsInArticle } from "./CommentsInArticle";
import { AddComment } from "./AddComment";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});

  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const { article_id } = useParams();

  const [hasUpVoted, setHasUpVoted] = useState(false);

  const [hasDownVoted, setHasDownVoted] = useState(false);

  const [commentCount,setCommentCount] = useState(0)
  const [commentUpdated, setCommentUpdated] = useState(false);

  const navigate = useNavigate();

  const handleUpVote = () => {
    if (!user.username) {
      alert("Please Login In Order To Vote");
      navigate("/login");
    } else {
      const voteChange = hasDownVoted ? 2 : 1;

      if (!hasUpVoted) {
        updateArticleVote(article_id, { inc_vote: voteChange }).then(() => {
          getSingleArticle(article_id).then((data) => {
            setArticle(data);
            setHasUpVoted(true);
            setHasDownVoted(false);
          });
        });
      }
    }
  };
  const handleDownVote = () => {
    if (!user.username) {
      alert("Please Login In Order To Vote");
      navigate("/login");
    } else {
      const voteChange = hasUpVoted ? -2 : -1;

      if (!hasDownVoted) {
        updateArticleVote(article_id, { inc_vote: voteChange }).then(() => {
          getSingleArticle(article_id).then((data) => {
            setArticle(data);
            setHasDownVoted(true);
            setHasUpVoted(false);
          });
        });
      }
    }
  };

  const handleCommentPost = () => { return setCommentUpdated((prev) => !prev)}

  useEffect(() => {
    setLoading(true);
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
        setCommentCount(data.comment_count)
        setLoading(false);
      })
      .catch((error) => {
        navigate("/404");
      });
  }, [article_id,commentCount]);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
          <div className="single-article-box">
            <div className="text-center w-full">
              <h1 className="text-3xl font-extrabold underline text-black ">
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
                  <button
                    className={`vote-button ${
                      hasUpVoted ? "bg-green-500" : "bg-gray-400"
                    }`}
                    onClick={handleUpVote}
                  >
                    Up
                  </button>
                  <button
                    className={`vote-button ${
                      hasDownVoted ? "bg-red-500" : "bg-gray-400"
                    }`}
                    onClick={handleDownVote}
                  >
                    Down
                  </button>
                </div>
                <p className="font-light italic">Author,NC - News </p>
                <hr className="border-black border-1 w-[125px] mb-3 " />
              </div>
              <div className="text-start ml-2 italic">
                <p>
                  {article.created_at
                    ? formatter.format(new Date(article.created_at))
                    : "Date not available"}
                </p>
              </div>
              <div className="text-start ml-2 mt-2 mb-2">
                <p>{article.body}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddComment article_id={article_id} handleCommentPost={handleCommentPost} />

      <CommentsInArticle article_id={article_id} commentUpdated={commentUpdated} />
    </>
  );
};
