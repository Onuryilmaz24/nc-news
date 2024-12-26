import { useContext, useEffect, useState } from "react";

import { UserContext } from "../Contexts/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { deleteUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserArticles } from "./UserArticles";

export const UserPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const onClick = () => {
    deleteUser(user.username).then((data) => {
      setUser({
        username: "",
        name: "",
        avatar_url: "",
      });
      navigate("/");
    });
  };

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex flex-wrap gap-8 p-4 justify-center ">
          <div className="flex flex-col max-phone::flex-row items-center border-2 w-full max-w-4xl mx-auto shadow-md">
            <div className="p-4">
              <img
                src={user.avatar_url}
                alt="user-img"
                className="rounded-full max-phone:w-[150px] max-phone:h-[150px] w-[300px] h-[300px] border-2 border-red-400 shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-4">
              <div className="flex">
                <p className="italic"> Username : </p>{" "}
                <span className="font-extrabold ml-2"> {user.username}</span>
              </div>
              <div className="flex">
                <p className="italic"> Name : </p>{" "}
                <span className="font-extrabold ml-2"> {user.name}</span>
              </div>
              <button
                className="border-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-2 p-2"
                onClick={onClick}
              >
                {" "}
                Delete User{" "}
              </button>
            </div>
          </div>
          <UserArticles />
        </div>
      )}
    </>
  );
};
