import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    avatar_url: "",
  });

  useEffect(()=>{
    const savedUser = localStorage.getItem("user");

    if(savedUser){
        setUser(JSON.parse(savedUser))
    }
  },[])

  useEffect(()=>{
    if(user.username){
        localStorage.setItem("user",JSON.stringify(user))
    }
  },[user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
