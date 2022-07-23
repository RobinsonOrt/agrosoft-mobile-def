import global from "../global";
import React, { useState, createContext, useContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";


const MyUserContext = createContext();

const MyUserProvider = ({ children }) => {
  
  const [user, setUser] = useState([]);
  const [error, setError] = useState({ status: false, message: "" });
  const [response, setResponse] = useState({ status: false, message: "" });

  const LoadUser = async (idUser) => {
    const userResponse = await axios.get(`${REACT_APP_API_URL}/api/user/${idUser}`);
    setUser(userResponse.data.response);
    return userResponse
  };

  const ModifyUser = async (userParam) =>{
    
    const userResponse = await axios.put(`${REACT_APP_API_URL}/api/modifyuser`, userParam);
    LoadUser(userParam.idUser);
    setError({ status: userResponse.data.error, message: userResponse.data.response });
    return userResponse;
  }

  const ComparePassword = async (data) => {
    const userResponse = await axios.post(`${REACT_APP_API_URL}/api/comparepassword`, data);
    global.tokenChange = userResponse.data.response;
    return userResponse;
  }

  const ModifyEmail = async (data) => {
    const userResponse = await axios.post(`${REACT_APP_API_URL}/api/changeemail`, data);
    setResponse({ status: userResponse.data.error, message: userResponse.data.response });
    return userResponse;
  }

  const ChangePassword = async (data) => {
    const userResponse = await axios.put(`${REACT_APP_API_URL}/api/newpassword`, data);
    setResponse({ status: userResponse.data.error, message: userResponse.data.response });
    return userResponse;
  }

  const ChangeState = async (data) => {
    const userResponse = await axios.put(`${REACT_APP_API_URL}/api/changestate`, data);
    setResponse({ status: userResponse.data.error, message: userResponse.data.response });
    return userResponse;
  }
  
  return (
    <MyUserContext.Provider value={{
        user,
        setUser,
        LoadUser,
        ModifyUser,
        error,
        ComparePassword,
        response,
        ModifyEmail,
        ChangePassword,
        ChangeState

    }}>
      {children}
    </MyUserContext.Provider>
  );
};
export { MyUserProvider };
export default MyUserContext;