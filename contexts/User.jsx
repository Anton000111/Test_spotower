'use client'
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const prevUser = localStorage.getItem('user');

    if (!prevUser) return;

    setUser(JSON.parse(prevUser));
  }, []);

  const saveUser = (newUser) => {
    setUser(newUser);

    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logOut = () => {
    setUser(undefined);

    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};