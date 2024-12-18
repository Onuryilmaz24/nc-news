import { useContext, useEffect, useState } from "react";

import { UserContext } from "../Contexts/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const UserPage = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500 mx-auto flex flex-col justify-center items-center min-h-[80vh]" />
      ) : (
        <div className="flex justify-center">
          <div className="flex justify-start border-2 w-full mx-8 shadow-md">
              <div>
                <img src={user.avatar_url} alt="user-img" className="rounded-full w-[300px] h-[300px] border-2 border-red-400 shadow-md"/>
              </div>
              <div className="flex flex-col justify-center gap-5">
                  <div className="ml-10 flex">
                    <p className="italic"> Username : </p> <span className="font-extrabold"> {user.username}</span>
                  </div>
                  <div className="ml-10 flex">
                    <p className="italic"> Name : </p> <span className="font-extrabold"> {user.name}</span>
                  </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};
