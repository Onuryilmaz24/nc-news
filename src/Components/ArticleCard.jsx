import { Link, useNavigate } from "react-router-dom";
import { formatter } from "../utils/dateFormat";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { deleteArticle } from "../utils/api";

export const ArticleCard = ({ article }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate

  const handleClick = () => {
    deleteArticle(article.article_id).then((data)=>{
    
    })
  }


  return (
    <>
      <div className="article-cards">
        <Link to={`/articles/${article.article_id}`} >
          <img
            src={article.article_img_url}
            alt="article-image"
            className="w-full h-32 rounded-lg object-cover mb-3"
          />
          <h2 className="text-center text-sm font-bold">{article.title}</h2>
          <p className="text-xs text-gray-500 mb-2 italic font-bold">{article.topic}</p>
          <div className="w-full flex justify-between items-start text-xs text-gray-500">
            <div className="flex flex-col text-left">
              <span>Votes: {article.votes}</span>
              <span>Comments: {article.comment_count}</span>
            </div>
            <div className="text-right mb-3">
              <p className="text-xs text-gray-600">By: {article.author}</p>
              <p className="text-xs text-gray-500">
                {formatter.format(new Date(article.created_at))}
              </p>
            </div>
          </div>
        </Link>
        {user.username === article.author ? <div>
          <button className="w-full border-2 rounded-full  bg-red-400 " onClick={handleClick}>
            Delete Article
          </button>
        </div> : null}
      </div>
    </>
  );
};
