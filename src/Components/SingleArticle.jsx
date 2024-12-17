import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsOfSingleArticle, getSingleArticle } from "./api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CommentCard } from "./CommentCard";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});

  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

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

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
            <div className="single-article-box">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold underline text-black">{article.title}</h1>
                </div>
                <div className="w-[750px] justify-self-center">
                    <div className="flex justify-center">
                        <img src={article.article_img_url} alt="article-image" className="w-[750px] h-[500px] mt-5" />
                    </div>
                    <div className="text-start mt-2 ml-2">
                        <div className="flex justify-between">
                            <p className="font-bold italic">{article.author}</p>
                            <p className= "mr-2 font-bold">
                                {article.votes} <span className="font-light italic">Votes</span>
                            </p>
                        </div>
                        <p className="font-light italic">Author,NC - News </p>
                        <hr className="border-black border-1 w-[125px] mb-3 "/>
                    </div>
                    <div className="text-start ml-2 italic">
                        <p>
                            {new Date(article.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-start ml-2 mt-2 mb-2">
                        <p>{article.body}</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {
        loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
          ) : (
            <div className="flex flex-col justify-center mt-5 border-2 mx-8">
                <div>
                    <h1 className="text-2xl italic font-bold ml-10 mb-5 mt-2">Comments</h1>
                </div>
                {comments.map((comment)=>{
                   return <CommentCard comment={comment}/>
                })}
            </div>
          )
      }
    </>
  );
};