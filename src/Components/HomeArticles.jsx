import { useEffect, useState } from "react";
import { getAllArticles } from "./api";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";

export const HomeArticles = () => {
  const [articles, setArticles] = useState([]);

  const [articlesToShow, setArticlesToShow] = useState(4);

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
    getAllArticles(articlesToShow, 1)
      .then((data) => {
        setArticles(data);
      })
      .catch((error) => {
        console.log("FetchError", error);
      });

    window.addEventListener("resize", updateArticlesToShow);

    return () => window.removeEventListener("resize", updateArticlesToShow);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="home-articles-box">
        <h1 className="text-white font-extrabold ml-2 p-2 italic text-2xl">
          Articles
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
          <Link to={"/articles"}>
              <button className="border-2 text-2xl text-center items-center w-[200px] shadow-md text-white rounded-full hover:scale-110 ease-in duration-200">
                Explore More
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
