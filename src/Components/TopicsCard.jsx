import { Link } from "react-router-dom";

export const TopicsCard = ({ topic }) => {

    const imgUrlForCoding = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const imgUrlForCooking = "https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const imgUrlForFootball = "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    let baseUrl = ""

    if(topic.slug === "coding"){
        baseUrl = imgUrlForCoding
    }else if(topic.slug === "cooking"){
        baseUrl = imgUrlForCooking
    }else if(topic.slug === "football"){
        baseUrl = imgUrlForFootball
    }



  return (
    <Link to={`/topics/${topic.slug}`} className="topic-cards">
      <img
        src={baseUrl}
        alt="topic-image"
        className="w-full h-32 rounded-lg object-cover mb-3"
      />
      <h2 className="text-center text-sm font-bold">{topic.slug}</h2>
      <p className="text-xs text-gray-500 mb-2">{topic.description}</p>

    </Link>
  );
};
