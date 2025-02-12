import { useContext, useEffect, useState } from "react";
import { getUserArticles } from "../utils/api";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export const UserArticles = () => {
  const [articles, setArticles] = useState([]);

  const [articlesToShow, setArticlesToShow] = useState(4);

  const {user}  = useContext(UserContext)

  const updateArticlesToShow = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      setArticlesToShow(2);
    } else if (windowWidth < 1024) {
      setArticlesToShow(3);
    } else {
      setArticlesToShow(4);
    }
  };

  useEffect(() => {
    updateArticlesToShow();
    getUserArticles(user.username)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.log("FetchError", error);
      });

    window.addEventListener("resize", updateArticlesToShow);

    return () => window.removeEventListener("resize", updateArticlesToShow);
  }, [articlesToShow,articles]);

  return (
    <div className="flex justify-center">
      <div className="users-articles-box">
        <h1 className="text-white font-extrabold ml-2 p-2 italic text-2xl">
          {user.username} Articles
        </h1>
        <div className="flex gap-6 phone:overflow-x-auto overflow-y-auto flex-wrap phone:flex-nowrap ml-96 max-phone:ml-0">
          {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </div>
      </div>
    </div>
  );
};
