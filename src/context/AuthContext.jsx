import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const loginUrl = "https://backend-tienda-nucba.vercel.app/signin";
const registerUrl = "https://backend-tienda-nucba.vercel.app/signup";

//expires cookie test
const tiempo = new Date(new Date().getTime() + 1 * 60 * 1000);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const cookies = Cookies.get("TOKEN");
    if (!cookies) {
      setUser(null);
      setIsAuth(false);
    }
  }, [user]);

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
      Cookies.set("TOKEN", res.data.token, { expires: tiempo });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    Cookies.remove("TOKEN");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        createUser,
        logout,
        isAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
