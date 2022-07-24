import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestsOtherFarms from "../screens/RequestsOtherFarms";
import { MyRequestsOtherFarmsProvider } from "../context/RequestsOtherFarmsContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";


const RequestsOtherFarmsStack = ({ navigation }) => {

    const HomeStack = createNativeStackNavigator();
    
    return (
        <MyRequestsOtherFarmsProvider>
            <HomeStack.Navigator screenOptions={{
                title:"",
                headerTintColor: "#fff",
                headerStyle:styles.headerStyle,
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                headerTitle:() => ( <HeaderTitle navigation={navigation}/>),
                headerTitleAlign:"center",
                }}>

                <HomeStack.Screen name="RequestsOtherFarms" component={RequestsOtherFarms}/>
                
            </HomeStack.Navigator>
        </MyRequestsOtherFarmsProvider>


    );
};

export default RequestsOtherFarmsStack;