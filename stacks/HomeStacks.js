import global from "../global";
import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Profile from "../assets/profile.png";
import tw from "twrnc";
import EnterFarm from "../screens/EnterFarm";
import MyFarms from "../screens/MyFarms";
import Labor from "../screens/Labor";
import Employee from "../screens/Employee";
import { MyFarmsProvider } from "../context/FarmContext";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { MyLaborsProvider } from "../context/LaborsContext";
import Farms from "../screens/Farms";


// ...




const HomeStacks = ({ navigation }) => {

    
    const HomeStack = createNativeStackNavigator();
    return (
        <MyFarmsProvider>
        <MyEmployeesProvider>
        <MyLaborsProvider>
        <HomeStack.Navigator screenOptions={{headerStyle: {
            backgroundColor: '#EAB308',
            paddingLeft: 10,
            paddingRight: 10
        },title: '',
        headerTintColor: 'white',
        headerRight:() => ( <View style={tw`items-center flex-row`}>
            <TouchableOpacity style={tw`mr-1`} onPress={() => navigation.navigate('Administrar perfil')}><Image source={Profile} style={tw`h-35px w-35px`}/></TouchableOpacity><DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()}/>
            </View>),}}>
        
            <HomeStack.Screen name="MyFarms" component={MyFarms}/>
            <HomeStack.Screen name="EnterFarm" component={EnterFarm}/>
            <HomeStack.Screen name="Labor" component={Labor} />
            <HomeStack.Screen name="Employee" component={Employee} />
            <HomeStack.Screen name="Farms" component={Farms} />
        </HomeStack.Navigator>
        </MyLaborsProvider>
        </MyEmployeesProvider>
        </MyFarmsProvider>

    );     
};

export default HomeStacks;
