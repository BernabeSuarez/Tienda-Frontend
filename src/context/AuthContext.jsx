import { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const url = "http://localhost:8080/signin";

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

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(url, {
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
    <AuthContext.Provider value={{ user, loginUser, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
