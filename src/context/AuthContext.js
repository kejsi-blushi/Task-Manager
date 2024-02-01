import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userList from "./userList";

const AuthContext = createContext();

const setUserSession = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  // stores a user object in the local storage
};

const getUserSession = () => {
  const userOnSession = localStorage.getItem("currentUser");
  return userOnSession ? JSON.parse(userOnSession) : null;
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserSession);
  const navigate = useNavigate();

  const login = (username, password) => {
    //checks if a corresponding user exists in the userList
    const user = userList.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setUserSession(user);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    
  };

  // case:  user logs in from another tab/window
  // listen for changes in the local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getUserSession());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook that simplifies accessing AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
