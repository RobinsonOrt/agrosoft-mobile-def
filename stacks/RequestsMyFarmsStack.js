import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestsMyFarms from "../screens/RequestsMyFarms";
import { MyRequestsMyFarmsProvider } from "../context/RequestsMyFarmsContext";
import { MyFarmsProvider } from "../context/FarmContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";

const RequestMyFarmsStack = ({ navigation }) => {
    const HomeStack = createNativeStackNavigator();
    return (
        <MyRequestsMyFarmsProvider>
            <MyFarmsProvider>
                <HomeStack.Navigator screenOptions={{
                    headerTintColor: "#fff",
                    title:"",
                    headerStyle:styles.headerStyle,
                    headerRight:() => ( <HeaderRight navigation={navigation} />),
                    headerTitle:() => ( <HeaderTitle navigation={navigation}/>),
                    headerTitleAlign:"center",
                    }}>

                    <HomeStack.Screen name="RequestsMyFarms" component={RequestsMyFarms}/>
                </HomeStack.Navigator>
            </MyFarmsProvider>
        </MyRequestsMyFarmsProvider>
    );
};

export default RequestMyFarmsStack;