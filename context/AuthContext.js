import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from '@env'
import axios from "axios";

const AuthContext = createContext();





const AuthProvider = ({ children }) => {


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: global.jwToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: global.jwToken });
      },
    }),
    []
  );
  const [result, setResult] = useState();

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
  
    return loginResponse
  };

  const LogOut = async () => {
    global.tokenChange = "";
    global.idUser = "";
    global.jwToken = "";
    global.urlConnected = "";
    setResult({ data: { error: true, message: "Logout" } });
  }


  return (
    <AuthContext.Provider
      value={{
        LoginUser,
        result,
        setResult,
        RecoveryPassword,
        LogOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export { AuthProvider };
export default AuthContext;
