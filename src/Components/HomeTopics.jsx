import { useEffect, useState } from "react";
import { getAllTopics } from "./api";
import { TopicsCard } from "./TopicsCard";
import { Link } from "react-router-dom";

export const HomeTopics = () => {
  const [topics, setAllTopics] = useState([]);

  const [topicsToShow, setTopicsToShow] = useState(3);

  const updateTopicsToShow = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      setTopicsToShow(2);
    } else if (windowWidth < 1024) {
      setTopicsToShow(3);
    } else {
      setTopicsToShow(4);
    }
  };

  useEffect(() => {
    updateTopicsToShow();
    getAllTopics()
      .then((data) => {
        setAllTopics(data);
      })
      .catch((error) => {
        console.log("FetchError", error);
      });

    window.addEventListener("resize", updateTopicsToShow);

    return () => window.removeEventListener("resize", updateTopicsToShow);
  }, []);

  return (
    <div className="flex justify-center mb-10">
      <div className="home-articles-box">
        <h1 className="text-white font-extrabold ml-2 p-2 italic text-2xl">
          Topics
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {topics.map((topic) => {
            return <TopicsCard topic={topic} key={topic.slug} />;
          })}
          <Link to={"/topics"}>
            <button className="border-2 text-2xl text-center items-center w-[200px] shadow-md text-white rounded-full hover:scale-110 ease-in duration-200">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
