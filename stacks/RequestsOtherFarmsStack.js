import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RequestsOtherFarms from "../screens/RequestsOtherFarms";
import { MyRequestsOtherFarmsProvider } from "../context/RequestsOtherFarmsContext";
import { HeaderLeft, HeaderRight, styles } from "../components/Header";


const RequestsOtherFarmsStack = ({ navigation }) => {

    const HomeStack = createNativeStackNavigator();
    
    return (
        <MyRequestsOtherFarmsProvider>
            <HomeStack.Navigator screenOptions={{
                title:"",
                headerStyle:styles.headerStyle,
                headerLeft:() => ( <HeaderLeft navigation={navigation} />),
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                }}>

                <HomeStack.Screen name="RequestsOtherFarms" component={RequestsOtherFarms}/>
                
            </HomeStack.Navigator>
        </MyRequestsOtherFarmsProvider>


    );
};

export default RequestsOtherFarmsStack;