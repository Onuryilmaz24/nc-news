import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`} className="article-cards">
      <img
        src={article.article_img_url}
        alt="article-image"
        className="w-full h-32 rounded-lg object-cover mb-3"
      />
      <h2 className="text-center text-sm font-bold">{article.title}</h2>
      <p className="text-xs text-gray-500 mb-2">{article.topic}</p>
      <div className="w-full flex justify-between items-start text-xs text-gray-500">
        <div className="flex flex-col text-left">
          <span>Votes: {article.votes}</span>
          <span>Comments: {article.comment_count}</span>
        </div>
        <div className="text-right mb-3">
          <p className="text-xs text-gray-600">By: {article.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};
