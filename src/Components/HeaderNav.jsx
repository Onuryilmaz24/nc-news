import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export const HeaderNav = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Navigate hook'u eklendi

  const handleClick = () => {
    setUser({ username: "", name: "", avatar_url: "" });
    localStorage.removeItem("user");
    navigate("/");

  };

  return (
    <>
      <div className="border-2 z-10 border-red-500 w-auto flex items-center justify-between bg-red-500 sticky top-0 flex-wrap mb-2">
        {/* Header */}
        <Link
          to={"/"}
          className="w-36 flex items-center justify-center ml-5 shadow-md hover:scale-105 ease-in duration-300"
        >
           <img src="https://logoeps.com/wp-content/uploads/2014/05/21601-news-logo-icon-vector-icon-vector-eps.png" alt="logo" className="size-12 max-phone:size-6" />
          <p className="font-extrabold text-white px-2 text-xl max-phone:text-xs">NC-NEWS</p>
         
        </Link>
        {/* Topics Articles */}
        <div className="flex gap-4 items-center justify-center">
          <Link
            to={"/topics"}
            className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
          >
            <p className="font-extrabold text-white text-xl max-phone:text-xs">Topics</p>
          </Link>
          <Link
            to={"/articles"}
            className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
          >
            <p className="font-extrabold text-white text-xl max-phone:text-xs">Articles</p>
          </Link>
        </div>
        {/* UserPage LogIn / Sign Up */}
        <div className="flex">
          {user.username ? (
            <>
              <Link
                to={user.username ? `/${user.username}/userpage` : "/login"}
                className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
              >
                <FaRegUser className="text-white border mr-3 rounded-full size-6" />
                <p className="font-bold text-white text-xl max-phone:text-xs">
                  {user.username}
                </p>
              </Link>
              <Link
                to={"/"}
                className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
                onClick={handleClick}
              >
                <CiLogout className="text-white border mr-3 rounded-full size-6" />
                <p className="font-extrabold text-white text-xl max-phone:text-xs">Log Out</p>
              </Link>
            </>
          ) : (
            <Link
              to={user.username ? `/${user.username}/userpage ` : "/login"}
              className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
            >
              <p className="font-extrabold text-white text-xl max-phone:text-xs">
                LogIn / Sign Up
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
