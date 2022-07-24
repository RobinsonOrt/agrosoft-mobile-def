import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserInformation from "../screens/UserInformation";
import { MyUserProvider } from "../context/UserContext";
import { MyIdentifierProvider } from "../context/IdentifierContext";
import { AuthProvider } from "../context/AuthContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";
import Home from "../screens/Home";

const AccountStack = ({ navigation }) => {
    
    const HomeStack = createNativeStackNavigator();

    return (
        <MyUserProvider>
          <MyIdentifierProvider>
              <HomeStack.Navigator 
                initialRouteName="UserInformation" 
                screenOptions={{
                  title:"",
                  headerTintColor: "#fff",
                headerStyle:styles.headerStyle,
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                headerTitle:() => ( <HeaderTitle navigation={navigation}/>),
                headerTitleAlign:"center",
                }}>
                  <HomeStack.Screen name="UserInformation" component={UserInformation}/>
              </HomeStack.Navigator>
          </MyIdentifierProvider>
        </MyUserProvider>
    );     
};

export default AccountStack;
