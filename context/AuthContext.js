import React, { useState, createContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [result, setResult] = useState();

  const onSubmit = async (data) => {
    data.link = (AGROSOFT_LINK + "/newpassword/?token=")
    await axios
      .post(REACT_APP_API_URL + "/api/generate", data)
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
