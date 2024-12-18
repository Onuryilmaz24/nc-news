import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export const HeaderNav = () => {
  const { user, setUser } = useContext(UserContext);

  const handleClick = () => {
    setUser({ username: "", name: "", avatar_url: "" });
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className="border-2 h-[50px] m-8 border-red-500 flex items-center justify-between bg-red-500">
        {/* Header */}
        <Link
          to={"/"}
          className="w-32 flex items-center justify-center ml-5 shadow-md hover:scale-105 ease-in duration-300"
        >
          <p className="font-extrabold text-2xl text-white px-2">NC-NEWS</p>
        </Link>
        {/* Topics Articles */}
        <div className="flex gap-4 items-center justify-center">
          <Link
            to={"/topics"}
            className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
          >
            <p className="font-extrabold text-2xl text-white">Topics</p>
          </Link>
          <Link
            to={"/articles"}
            className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
          >
            <p className="font-extrabold text-2xl text-white">Articles</p>
          </Link>
        </div>
        {/* UserPage LogIn / Sign Up */}
        <div className="flex gap-8 mr-8">
          {user.username ? (
            <>
              <Link
                to={user.username ? `/${user.username}/userpage` : "/login"}
                className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
              >
                <FaRegUser className="text-white border mr-3 rounded-full size-8" />
                <p className="font-extrabold text-2xl text-white">
                  {user.username}
                </p>
              </Link>
              <Link
                to={"/"}
                className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
                onClick={handleClick}
              >
                <CiLogout className="text-white border mr-3 rounded-full size-8" />
                <p className="font-extrabold text-2xl text-white">Log Out</p>
              </Link>
            </>
          ) : (
            <Link
              to={user.username ? `/${user.username}/userpage ` : "/login"}
              className="flex items-center justify-center shadow-md px-2 hover:scale-105 ease-in duration-300"
            >
              <p className="font-extrabold text-2xl text-white">
                LogIn / Sign Up
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
