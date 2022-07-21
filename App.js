import global from "./global";
import React, {useReducer} from "react";
import "react-native-gesture-handler";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AuthProvider } from "./context/AuthContext";
import TokenValidation from "./screens/TokenValidation";
import PasswordRecovery from "./screens/PasswordRecovery";
import TokenValidationTwo from "./screens/TokenValidationTwo";
import PasswordRecoveryForm from "./screens/PasswordRecoveryForm";
import UserLoged from "./screens/UserLoged";
import TokenVerificated from "./screens/TokenVerificated";
import NotConected from "./screens/NotConected";
import HomeStacks from "./stacks/HomeStacks";
import MyMenu from "./stacks/MyMenu";
import UserInformation from "./screens/UserInformation";
import MyFarms from "./screens/MyFarms";
import { NavigationContainer } from "@react-navigation/native";
import EnterFarm from "./screens/EnterFarm";
import Farms from "./screens/Farms";
import Requests from "./screens/Requests";
import { MyFarmsProvider } from "./context/FarmContext";
import { CountryProvider } from "./context/CoutryContext";
import EmployeeCrops from "./screens/EmployeeCrops";
import EmployeeShrubbery from "./screens/EmployeeShrubbery";
import * as SecureStore from 'expo-secure-store';
export default function App({navigation}) {
  
  return (
    <CountryProvider>
      <AuthProvider>
        <MyFarmsProvider>
          <NativeRouter>
            <Routes>
              <Route exact path="/" element={<MyMenu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tokenValidation" element={<TokenValidation />} />
              <Route path="/passwordRecovery" element={<PasswordRecovery />} />
              <Route
                path="/tokenValidationPassword"
                element={<TokenValidationTwo />}
              />
              <Route
                path="/passwordRecoveryForm"
                element={<PasswordRecoveryForm />}
              />
              <Route path="/userLoged" element={<MyMenu />} />
              <Route path="/accountActivated" element={<TokenVerificated />} />
              <Route path="/notConected" element={<NotConected />} />
              <Route path="/userInformation" element={<UserInformation />} />
              <Route path="/enterFarm22" element={<EnterFarm />} />
              <Route path="/employeecrops" element={<EmployeeCrops />} />
              <Route
                path="/employeeshrubbery"
                element={<EmployeeShrubbery />}
              />
            </Routes>
          </NativeRouter>
        </MyFarmsProvider>
      </AuthProvider>
    </CountryProvider>
  );
}
