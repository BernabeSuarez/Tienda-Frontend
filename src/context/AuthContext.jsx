import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const loginUrl = "http://localhost:8080/signin";
const registerUrl = "http://localhost:8080/signup";
const checkUrl = "http://localhost:8080/checktoken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    axios.get(checkUrl);
  };

  useEffect(() => {
    async function checkToken() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuth(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await checkToken(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return;
        }
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkToken();
  }, []);

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
      value={{
        user,
        loginUser,
        createUser,
        logout,
        isAuth,
        checkToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
