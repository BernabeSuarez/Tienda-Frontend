import { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const loginUrl = "http://localhost:8080/signin";
const registerUrl = "http://localhost:8080/signup";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const createUser = async (name, email, password) => {
    try {
      const res = await axios.post(registerUrl, {
        name,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(loginUrl, {
        email,
        password,
      });
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, createUser, logout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
