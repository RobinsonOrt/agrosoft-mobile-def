import global from "../global";
import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import tw from "twrnc";
import UserInformation from "../screens/UserInformation";
import { MyUserProvider } from "../context/UserContext";
import { MyIdentifierProvider } from "../context/IdentifierContext";
import { AuthProvider } from "../context/AuthContext";



// ...




const AccountStack = ({ navigation }) => {

    
    const HomeStack = createNativeStackNavigator();
    return (
        <MyUserProvider>
        <MyIdentifierProvider>
        <AuthProvider>
        <HomeStack.Navigator screenOptions={{headerStyle: {
            backgroundColor: '#EAB308',
            paddingLeft: 10,
            paddingRight: 10
        },title: '',
        headerTintColor: 'white',
        headerRight:() => ( <View style={tw`items-center flex-row`}>
            <DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()}/>
            </View>),}}>
        
            <HomeStack.Screen name="UserInformation" component={UserInformation}/>
        </HomeStack.Navigator>
        </AuthProvider>
        </MyIdentifierProvider>
        </MyUserProvider>
    

    );     
};

export default AccountStack;
