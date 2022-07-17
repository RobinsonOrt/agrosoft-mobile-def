import global from "../global";
import React, { useEffect } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { CommonActions, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Profile from "../assets/profile.png";
import Agrosoft from "../assets/agrosoft.png";
import tw from "twrnc";
import EnterFarm from "../screens/EnterFarm";
import MyFarms from "../screens/MyFarms";
import Labor from "../screens/Labor";
import Employee from "../screens/Employee";
import CoffeeBush from "../screens/CoffeeBush";
import { MyFarmsProvider } from "../context/FarmContext";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { MyLaborsProvider } from "../context/LaborsContext";
import { MyCropsProvider } from "../context/CropContext";
import { MyCoffeeBushProvider } from "../context/CoffeeBushContext";
import { MyActivitiesProvider } from "../context/ActivityContext";
import { MyFieldsProvider } from "../context/FieldsContext";
//import { MyCoffeeBushProvider } from ".../context/CoffeeBushContext";
import Farms from "../screens/Farms";
import Hamburger from "../assets/hamburger.png"
import Header from "../components/Header";
import { SimpleLineIcons } from '@expo/vector-icons';
import { HeaderLeft, HeaderRight, styles } from "../components/Header";




const HomeStacks = ({ navigation }) => {

    

    const HomeStack = createNativeStackNavigator();
    return (
        <MyFarmsProvider>
        <MyCropsProvider>
        <MyCoffeeBushProvider>
        <MyActivitiesProvider>
        <MyFieldsProvider>
        <MyEmployeesProvider>
        <MyLaborsProvider>
        <HomeStack.Navigator  screenOptions={{
            title:"",
            headerStyle:styles.headerStyle,
            headerLeft:() => ( <HeaderLeft navigation={navigation} />),
            headerRight:() => ( <HeaderRight navigation={navigation} />),
            }}>
            
        
            <HomeStack.Screen name="MyFarms" component={MyFarms}/>
            <HomeStack.Screen name="EnterFarm" component={EnterFarm}/>
            <HomeStack.Screen name="Labor" component={Labor} />
            <HomeStack.Screen name="Employee" component={Employee} />
            <HomeStack.Screen name="CoffeeBush" component={CoffeeBush} />
        </HomeStack.Navigator>
        </MyLaborsProvider>
        </MyEmployeesProvider>
        </MyFieldsProvider>
        </MyActivitiesProvider>
        </MyCoffeeBushProvider>
        </MyCropsProvider>
        </MyFarmsProvider>

    );     
};

export default HomeStacks;
