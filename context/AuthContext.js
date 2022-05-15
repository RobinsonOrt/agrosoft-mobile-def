import React, { useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [result, setResult] = useState();

  const onSubmit = async (data) => {
    data.link = ("https://agrosoft.vercel.app/newpassword/?token=")
    await axios
      .post("https://agrosoft.herokuapp.com/api/generate", data)
      .then((res) => setResult(res));
  };

  const data = {
    onSubmit,
    result,
    setResult
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
