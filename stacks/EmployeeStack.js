import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Farms from "../screens/Farms";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";


const EmployeeStack = ({ navigation }) => {

    const HomeStack = createNativeStackNavigator();
    
    return (
        <MyEmployeesProvider>
            <HomeStack.Navigator screenOptions={{
                title:"",
                headerStyle:styles.headerStyle,
                headerRight:() => ( <HeaderRight navigation={navigation} />),
                headerTitle:() => ( <HeaderTitle navigation={navigation}/>),
                headerTitleAlign:"center",
                }}>

                <HomeStack.Screen name="Farms" component={Farms}/>

            </HomeStack.Navigator>
        </MyEmployeesProvider>
    );
};

export default EmployeeStack;