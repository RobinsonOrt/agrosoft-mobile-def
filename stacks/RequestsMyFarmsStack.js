import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestsMyFarms from "../screens/RequestsMyFarms";
import { MyRequestsMyFarmsProvider } from "../context/RequestsMyFarmsContext";
import { MyFarmsProvider } from "../context/FarmContext";
import { HeaderLeft, HeaderRight, styles } from "../components/Header";

const RequestMyFarmsStack = ({ navigation }) => {
    const HomeStack = createNativeStackNavigator();
    return (
        <MyRequestsMyFarmsProvider>
            <MyFarmsProvider>
                <HomeStack.Navigator screenOptions={{
                    title:"",
                    headerStyle:styles.headerStyle,
                    headerLeft:() => ( <HeaderLeft navigation={navigation} />),
                    headerRight:() => ( <HeaderRight navigation={navigation} />),
                    }}>

                    <HomeStack.Screen name="RequestsMyFarms" component={RequestsMyFarms}/>
                </HomeStack.Navigator>
            </MyFarmsProvider>
        </MyRequestsMyFarmsProvider>
    );
};

export default RequestMyFarmsStack;