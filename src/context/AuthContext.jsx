import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

const loginUrl = "https://backend-tienda-nucba.onrender.com/signin";
const registerUrl = "https://backend-tienda-nucba.onrender.com/signup";

//expires cookie test
const tiempo = new Date(new Date().getTime() + 15 * 60 * 1000);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const toast = useToast();

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
      toast({
        title: "Bienvenido!",
        description: "Que alegria tenerlos en nuestra tienda",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
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
