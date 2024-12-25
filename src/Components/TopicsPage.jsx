import { useEffect, useState } from "react";
import { getAllTopics } from "../utils/api";
import { TopicsCard } from "./TopicsCard";
import { Link } from "react-router-dom";


export const TopicsPage = () => {
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
          alert("FetchError");
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
          </div>
        </div>
      </div>
    );
}