import global from "../global";
import React, { useState, createContext, useEffect   } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from '@env'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext();





const AuthProvider = ({ children }) => {


  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [userId, setUserId] = useState(null)
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
    if(!loginResponse.data.error){
      setIsLoading(true)
	    setUserInfo(loginResponse)
      setUserToken(loginResponse.data.response)
      setUserId(loginResponse.data.idUser)
// user data is stored so you don't have to re-enter credentials
      AsyncStorage.setItem('userInfo', JSON.stringify(loginResponse))
      AsyncStorage.setItem('userToken', loginResponse.data.response)
      AsyncStorage.setItem('userId', loginResponse.data.idUser)
      setIsLoading(false);
    }
    
    setResult(loginResponse)

    return loginResponse
  };

  const LogOut = async () => {
    global.tokenChange = "";
    global.idUser = "";
    global.jwToken = "";
    global.urlConnected = "";
    setIsLoading(true)
    setUserToken(null);
    setUserInfo(null)
    AsyncStorage.removeItem('userInfo')
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('userId')
    setIsLoading(false);
    await setResult({ data: { error: true, message: "Logout" } });
    setLogged(null);
  }

  const isLoggedIn = async()=>{
    try {
      setIsLoading(true);
      let userInfo =  await AsyncStorage.getItem('userInfo')
      let userToken = await AsyncStorage.getItem('userToken') 
      let userId = await AsyncStorage.getItem('userId')
      console.log("vea: "+userInfo)
      setUserInfo(userInfo) 
      setUserToken(userToken);
      setUserId(userId)
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`)
    }
    
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{
        LoginUser,
        result,
        setResult,
        RecoveryPassword,
        LogOut,
        logged,
        isLoading,
        userToken,
        userInfo,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export { AuthProvider };
export default AuthContext;
