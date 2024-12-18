import { useEffect, useState } from "react";
import { getAllArticles } from "./api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ArticleCard } from "./ArticleCard";
import { useParams } from "react-router-dom";

export const ArticlesByTopic = () => {
  const [topicArticles, setTopicsArticles] = useState([]);

  const {slug} = useParams();

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("created_at");

  const [order,setOrder] = useState("DESC")

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

  const handleChangeSort = (e) => {
    setQuery(e.target.value);
  };

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    getAllArticles(10,page,slug,query,order).then((data) => {
      setTopicsArticles(data);
      setLoading(false);
    });
  }, [page,query,order]);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
          <div className="all-articles-box">
            <h1 className="text-white font-extrabold text-2xl text-center italic mb-4">
             {slug} Articles
            </h1>
            <div className="flex mb-4">
              <label>
                Display
                <form id="order-sort">
                  <label className="" id="sort-by">
                    Sort By :
                    <select
                      id="sort-queries"
                      className="ml-4 mr-5"
                      onChange={handleChangeSort}
                      value={query}
                    >
                      <option value="created_at">Date(default)</option>
                      <option value="comment_count">Comment Count</option>
                      <option value="votes">Votes</option>
                    </select>
                  </label>
                  <label className="" id="order">
                    Order :
                    <select
                      id="sort-queries"
                      className="ml-4 mr-5"
                      onChange={handleChangeOrder}
                      value={order}
                    >
                      <option value="DESC">High to Low(default)</option>
                      <option value="ASC">Low to High</option>
                    </select>
                  </label>
                </form>
              </label>
            </div>
            <div className="articles-container">
              <div className="flex items-center justify-start gap-4 ml-2">
                {topicArticles.slice(0, 5).map((article) => {
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
                {topicArticles.slice(5, 10).map((article) => {
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
