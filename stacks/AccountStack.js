import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserInformation from "../screens/UserInformation";
import { MyUserProvider } from "../context/UserContext";
import { MyIdentifierProvider } from "../context/IdentifierContext";
import { AuthProvider } from "../context/AuthContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";

const AccountStack = ({ navigation }) => {
    
    const HomeStack = createNativeStackNavigator();

    return (
        <MyUserProvider>
          <MyIdentifierProvider>
            <AuthProvider>
              <HomeStack.Navigator 
                initialRouteName="UserInformation" 
                screenOptions={{
                  title:"",
                headerStyle:styles.headerStyle,
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                headerTitle:() => ( <HeaderTitle navigation={navigation}/>),
                headerTitleAlign:"center",
                }}>
                  <HomeStack.Screen name="UserInformation" component={UserInformation}/>
              </HomeStack.Navigator>
            </AuthProvider>
          </MyIdentifierProvider>
        </MyUserProvider>
    );     
};

export default AccountStack;
