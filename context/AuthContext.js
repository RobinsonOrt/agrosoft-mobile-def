import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from '@env'
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [result, setResult] = useState();
  const [logged, setLogged] = useState(null);

  const RecoveryPassword = async (data) => {
    data.link = (AGROSOFT_LINK + "/newpassword/?token=")
    await axios
      .post(REACT_APP_API_URL + "/api/generate", data)
      .then((res) => setResult(res));
  };

  const LoginUser = async (data) => {
    console.log(REACT_APP_API_URL)
    const user = { "email": data.email.toLowerCase(), "password": data.password }
    const loginResponse = await axios.post(REACT_APP_API_URL + "/api/login", user)
    setResult(loginResponse)
    console.log(loginResponse.data)
    if (!loginResponse.data.error) {
      setLogged(loginResponse.data.idUser)
    }
    return loginResponse
  };

  const LogOut = async () => {
    global.tokenChange = "";
    global.idUser = "";
    global.jwToken = "";
    global.urlConnected = "";
    await setResult({ data: { error: true, message: "Logout" } });
  }


  return (
    <AuthContext.Provider
      value={{
        LoginUser,
        result,
        setResult,
        RecoveryPassword,
        LogOut,
        logged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export { AuthProvider };
export default AuthContext;
