import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";

import Login from "../screens/Login";
import Home from "../screens/Home"
import PasswordRecovery from "../screens/PasswordRecovery";
import PasswordRecoveryForm from "../screens/PasswordRecoveryForm";
import TokenValidation from "../screens/TokenValidation";
import TokenValidationTwo from "../screens/TokenValidationTwo";
import TokenVerificated from "../screens/TokenVerificated";

const MainStack = ({ navigation }) => {
   

    const MainStack = createNativeStackNavigator();
    return (
        
            
            
              <MainStack.Navigator 
                initialRouteName="Home" 
                screenOptions={{
                  headerTintColor: "#fff",
                  title:"",
                  headerShown: false,
                }}>
                  <MainStack.Screen name="Home" component={Home}/>
                  <MainStack.Screen name="Register" component={Register} />
                  <MainStack.Screen name="Login" component={Login} />
                  <MainStack.Screen name="PasswordRecovery" component={PasswordRecovery} />
                  <MainStack.Screen name="PasswordRecoveryForm" component={PasswordRecoveryForm} />
                  <MainStack.Screen name="TokenValidationTwo" component={TokenValidationTwo} />
                  <MainStack.Screen name="TokenValidation" component={TokenValidation} />
                  <MainStack.Screen name="TokenVerificated" component={TokenVerificated} />
                  

              </MainStack.Navigator>
              
            

    );     
};

export default MainStack;
