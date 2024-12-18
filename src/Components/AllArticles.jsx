import { useEffect, useState } from "react";
import { getAllArticles } from "./api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ArticleCard } from "./ArticleCard";

export const AllArticles = () => {
  const [allArticles, setAllArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const handleNextClick = (e) => {
    e.preventDefault();

    setPage((currPage) => {
      currPage += 1;
      return currPage;
    });
  };
  const handlePreviousClick = (e) => {
    e.preventDefault();

    setPage((currPage) => {
        if(currPage===1){
            return currPage
        }else{
            currPage -= 1;
            return currPage;
        }
     
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllArticles(10, page).then((data) => {
      setAllArticles(data);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
          <div className="all-articles-box">
            <h1 className="text-white font-extrabold text-2xl text-center italic mb-4">
              All Articles
            </h1>
            <div className="articles-container">
              <div className="flex items-center justify-start gap-4 ml-2">
                {allArticles.slice(0, 5).map((article) => {
                  return (
                    <ArticleCard article={article} key={article.article_id} />
                  );
                })}
                <button
                  className="border-2 w-[150px] h-[100px] rounded-full hover:scale-110 ease-in duration-200 self-center text-white border-white"
                  onClick={handlePreviousClick}
                >
                  Previous Page
                </button>
              </div>
              <div className="flex items-center justify-start gap-4 ml-2 mt-2">
                {allArticles.slice(5, 10).map((article) => {
                  return (
                    <ArticleCard article={article} key={article.article_id} />
                  );
                })}
                <button
                  className="border-2 w-[150px] h-[100px] rounded-full hover:scale-110 ease-in duration-200 self-center text-white border-white"
                  onClick={handleNextClick}
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
