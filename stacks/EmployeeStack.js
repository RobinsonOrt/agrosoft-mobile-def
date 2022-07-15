import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Farms from "../screens/Farms";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { HeaderLeft, HeaderRight, styles } from "../components/Header";

const EmployeeStack = ({ navigation }) => {

    const HomeStack = createNativeStackNavigator();
    
    return (
        <MyEmployeesProvider>
            <HomeStack.Navigator screenOptions={{
                title:"",
                headerStyle:styles.headerStyle,
                headerLeft:() => ( <HeaderLeft navigation={navigation} />),
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                }}>

                <HomeStack.Screen name="Farms" component={Farms}/>

            </HomeStack.Navigator>
        </MyEmployeesProvider>
    );
};

export default EmployeeStack;