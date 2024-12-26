import { useEffect, useState } from "react";
import { addNewArticle, getAllTopics } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const PostArticlePage = () => {
  const [topics, setTopics] = useState([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: "",
    topic: "",
    author: user.username,
    body: "",
    article_img_url: "",
  });

  useEffect(() => {
    getAllTopics().then((data) => {
      setTopics(data);
    });
  }, [article.title, article.topic, article.body, article.article_img_url]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => {
      return { ...prevArticle, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(article.title.trim().length === 0){
        alert(` ${article.title} Can not be Empty`)
        return;
    }if(article.body.trim().length===0){
        alert(` ${article.body} Can not be Empty`)
        return;
    }
    addNewArticle(article).then((data)=> {
    navigate(`/articles/${data.article_id}`)
    })
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen mx-8 rounded-[100px] mt-10 bg-gray-300" id="login">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-8/12">
              <form name="add-comment" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold text-center mb-6">Post An Article</h1>
                <div>
                  <div className="mb-4">
                      <label id="title">
                        Title :
                        <input
                          type="text"
                          name="title"
                          className="border-2 w-full mt-1"
                          value={article.title}
                          onChange={onChange}
                          required
                        />
                      </label>
                  </div>
                  <div className="mb-4">
                      <label id="topic">
                        Topic:
                        <select
                          name="topic"
                          id="topic"
                          value={article.topic}
                          onChange={onChange}
                          required
                          className="w-full mt-1 bg-white"
                        >
                          <option name="empty-option" value={""}>
                            Please Select Topic
                          </option>
                          {topics.map((topic) => {
                            return (
                              <option value={topic.slug} key={topic.slug}>
                                {topic.slug}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                  </div>
                  <div className="mb-4">
                      <label id="username">
                        Username:
                        <input type="text" className="w-full border-2 mt-1" value={user.username}/>
                      </label>
                  </div>
                  <div className="mb-4 flex flex-col">
                      <label>
                        Your Text:
                        <textarea
                          name="body"
                          id="article-text"
                          placeholder="Your Text..."
                          className="border-2 w-full h-40 mt-1"
                          value={article.body}
                          onChange={onChange}
                          required
                        />
                      </label>
                  </div>
                  <div>
                      <label>
                        Article Image Url:
                        <input
                          type="url"
                          name="article_img_url"
                          className="border-2 w-full mt-1"
                          value={article.article_img_url}
                          onChange={onChange}
                        />
                      </label>
                  </div>
                  <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5" type="submit">
                    {" "}
                    Submit
                  </button>
                </div>
              </form>
          </div>
      </section>
    </>
  );
};
