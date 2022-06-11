import global from "../global";
import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Profile from "../assets/profile.png";
import tw from "twrnc";
import Farms from "../screens/Farms";
import { MyEmployeesProvider } from "../context/EmployeeContext";


const EmployeeStack = ({ navigation }) => {


    const HomeStack = createNativeStackNavigator();
    return (
        <MyEmployeesProvider>
        <HomeStack.Navigator screenOptions={{headerStyle: {
            backgroundColor: '#EAB308',
            paddingLeft: 10,
            paddingRight: 10
        },title: '',
        headerTintColor: 'white',
        headerRight:() => ( <View style={tw`items-center flex-row`}>
            <TouchableOpacity style={tw`mr-1`} onPress={() => navigation.navigate('Administrar perfil')}><Image source={Profile} style={tw`h-35px w-35px float-right`}/></TouchableOpacity>
            <DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()}/>
            </View>),}}>

            <HomeStack.Screen name="Farms" component={Farms}/>
        </HomeStack.Navigator>
        </MyEmployeesProvider>

    );
};

export default EmployeeStack;