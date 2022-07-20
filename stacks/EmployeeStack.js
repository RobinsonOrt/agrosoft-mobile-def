import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Farms from "../screens/Farms";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";
import EmployeeCrops from "../screens/EmployeeCrops";
import EmployeeShrubbery from "../screens/EmployeeShrubbery";
import CropsActivitys from "../screens/CropsActivitys";
import CropsRecords from "../screens/CropsRecords";
import BushActivitys from "../screens/BushActivitys";


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
                <HomeStack.Screen name="EmployeeCrops" component={EmployeeCrops} />
                <HomeStack.Screen name="EmployeeShrubbery" component={EmployeeShrubbery} />
                <HomeStack.Screen name="CropsActivitys" component={CropsActivitys} />
                <HomeStack.Screen name="CropsRecords" component={CropsRecords} />
                <HomeStack.Screen name="BushActivitys" component={BushActivitys} />

            </HomeStack.Navigator>
        </MyEmployeesProvider>
    );
};

export default EmployeeStack;