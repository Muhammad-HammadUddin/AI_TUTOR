/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// Create context
const UserContext = createContext();

// Create provider
const UserProvider = ({ children }) => {
  

  const[user,setUser]=useState('');
  const [login,setLogin]=useState(false)
  const [token,setToken]=useState('')

 useEffect(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    setLogin(true)
    setToken(parsedUser.token)
    console.log("Restored user:", parsedUser)
    console.log(parsedUser.token)
  }
}, [])


  useEffect(() => {
  if (user) {
    // optional: sync token or other things
    setToken(user.token)
    console.log("User changed:", user)
  }
}, [user])
  return (
    <UserContext.Provider value={{ user, setUser,login,setLogin,token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
