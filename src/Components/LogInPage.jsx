import { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getUserInformation } from "./api";
import { UserContext } from "../Contexts/UserContext";

export const LogInPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUserName] = useState("");

  const [users,setUsers] = useState([])

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  useEffect(()=>{
    getAllUsers().then((data)=>[
      setUsers(data)
    ])
  },[])

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getUserInformation(username).then((data) => {
      setUser(data);
      navigate(`/`);
    });
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-6xl text-red-500 mx-auto flex flex-col justify-center items-center min-h-[40vh]" />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="">
                  Username
                  <input
                  list="users"
                  name="user"
                  value={username}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <datalist id="users">
                  {
                    users.map((user) => <option value={user.username}></option>)
                  }
                </datalist>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};
