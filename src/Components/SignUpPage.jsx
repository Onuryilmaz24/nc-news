import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser, getAllUsers, getUserInformation } from "../utils/api";
import { UserContext } from "../Contexts/UserContext";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newUserInfo = { 
        ...userInfo, 
        avatar_url: userInfo.avatar_url.trim() === "" ? null : userInfo.avatar_url
      };
    
    addNewUser(newUserInfo).then((data) => {
    console.log(data)
      navigate("/login");
    });
  };

  return (
    <>
      <section
        className="flex justify-center items-center min-h-screen bg-gray-100"
        id="login"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-6xl text-red-500 mx-auto flex flex-col justify-center items-center min-h-[40vh]" />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="" id="login-username">
                  Username
                  <input
                    list="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="" id="login-username">
                  Name
                  <input
                    list="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="" id="login-username">
                  AvatarUrl(optional)
                  <input
                    list="text"
                    name="avatar_url"
                    value={userInfo.avatar_url}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In
              </button>
              <Link to={"/login"}>
                <label className="mt-2">
                  Do you have already account ?
                  <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Log In
                  </button>
                </label>
              </Link>
            </form>
          )}
        </div>
      </section>
    </>
  );
};
