import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";

import Login from "../screens/Login";
import Home from "../screens/Home"

const MainStack = ({ navigation }) => {
   

    const MainStack = createNativeStackNavigator();
    return (
        
            
            
              <MainStack.Navigator 
                initialRouteName="Home" 
                screenOptions={{
                  title:"",
                  headerShown: false,
                }}>
                  <MainStack.Screen name="Home" component={Home}/>
                  <MainStack.Screen name="Register" component={Register} />
                  <MainStack.Screen name="Login" component={Login} />
                  
                  

              </MainStack.Navigator>
              
            

    );     
};

export default MainStack;
