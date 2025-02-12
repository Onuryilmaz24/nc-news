import { useEffect, useState } from "react";
import { getAllArticles } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ArticleCard } from "./ArticleCard";
import { useNavigate, useParams } from "react-router-dom";

export const ArticlesByTopic = () => {
  const [topicArticles, setTopicsArticles] = useState([]);

  const {slug} = useParams();

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("created_at");

  const [order,setOrder] = useState("DESC")

  const navigate = useNavigate();



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
    }).catch((error)=>{
      navigate("/404")
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
              <div className="flex flex-wrap items-center justify-center gap-4 ml-2">
                {topicArticles.map((article) => (
                  <ArticleCard article={article} key={article.article_id} />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="border-2 px-6 py-2 rounded-md hover:scale-110 ease-in duration-200 text-white border-white mx-2"
                onClick={handlePreviousClick}
                disabled={page === 1} // Disable button if on the first page
              >
                Previous Page
              </button>
              <button
                className="border-2 px-6 py-2 rounded-md hover:scale-110 ease-in duration-200 text-white border-white mx-2"
                onClick={handleNextClick}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
