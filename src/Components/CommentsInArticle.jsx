import { useEffect, useState } from "react";
import { getCommentsOfSingleArticle, deleteComment } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CommentCard } from "./CommentCard";
import { useSearchParams } from "react-router-dom";

export const CommentsInArticle = ({ article_id, commentUpdated}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams ();
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");

  useEffect(()=>{
    if(!searchParams.has("order")){
      setSearchParams({
        order: order
      });
    }
  },[searchParams,order,setSearchParams])


  useEffect(() => {
    setLoading(true);
    getCommentsOfSingleArticle(article_id, order).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [article_id, order,commentUpdated]);

  const updateCommentVotesDisplay = (comment_id, inc_vote) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === comment_id
          ? { ...comment, votes: comment.votes + inc_vote }
          : comment
      )
    );
  };

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
    setSearchParams((prevParams)=>{
      return {...prevParams,order:e.target.value}
    })
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id);
    alert("Your comment has been deleted from article !!");
    setComments((prevComments) => {
      return prevComments.filter(
        (comment) => comment.comment_id !== comment_id
      );
    });
  };

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex flex-col justify-center mt-5 border-2 mx-8 shadow-md">
          <div>
            <h1 className="text-2xl italic font-bold ml-10 mb-5 mt-2">
              Comments
            </h1>
            <div className="flex mb-4">
              <label>
                Display
                <form id="order-sort">
                  <label className="" id="order">
                    Order :
                    <select
                      id="sort-queries"
                      className="ml-4 mr-5"
                      onChange={handleChangeOrder}
                      value={order}
                    >
                      <option value="DESC">Newest(default)</option>
                      <option value="ASC">Oldest</option>
                    </select>
                  </label>
                </form>
              </label>
            </div>
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
    </>
  );
};
