import global from "../global";
import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Profile from "../assets/profile.png";
import tw from "twrnc";
import RequestsOtherFarms from "../screens/RequestsOtherFarms";
import { MyRequestsOtherFarmsProvider } from "../context/RequestsOtherFarmsContext";


const RequestsOtherFarmsStack = ({ navigation }) => {


    const HomeStack = createNativeStackNavigator();
    return (
        <MyRequestsOtherFarmsProvider>
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

            <HomeStack.Screen name="RequestsOtherFarms" component={RequestsOtherFarms}/>
            
        </HomeStack.Navigator>
        </MyRequestsOtherFarmsProvider>


    );
};

export default RequestsOtherFarmsStack;