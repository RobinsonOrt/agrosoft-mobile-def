import global from "../global";
import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStacks from "./HomeStacks";
import AccountStack from "./AccountStack";
import EmployeeStack from "./EmployeeStack";
import RequestsMyFarmsStack from "./RequestsMyFarmsStack";
import RequestsOtherFarmsStack from "./RequestsOtherFarmsStack";
import { MenuItems } from "../components/MenuItems";
import MainStack from "./MainStack";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import tw from "twrnc"
import Home from "../screens/Home";
import Loading from "../components/Loading";


const Menu = createDrawerNavigator();



export function MyMenu() {
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();
    const [isOpenAccountStack, setIsOpenAccountStack] = useState(false);
    const [isOpenHomeStacks, setIsOpenHomeStacks] = useState(false);
    const [isOpenEmployeeStack, setIsOpenEmployeeStack] = useState(false);
    const [isOpenRequestsMyFarmsStack, setIsOpenRequestsMyFarmsStack] =
    useState(false);
    const [isOpenRequestsOtherFarmsStack, setIsOpenRequestsOtherFarmsStack] =
    useState(false);

    const {isLoading, userToken, userId, userInfo} = useContext(AuthContext)

    global.idUser = userId;
    global.jwToken = userInfo;

  

    if(isLoading){
      return(

          <Loading isVisible={true}/>
        
      )
        
    }
    console.log("epa:"+userToken)

  return (

    
    
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current;
      }}
      onStateChange={(state) => {
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (currentRouteName === "Farms") {
          setIsOpenAccountStack(false);
          setIsOpenEmployeeStack(true);
          setIsOpenHomeStacks(false);
          setIsOpenRequestsMyFarmsStack(false);
          setIsOpenRequestsOtherFarmsStack(false);
        }
        if (
          currentRouteName === "MyFarms" ||
          currentRouteName === "EnterFarm" ||
          currentRouteName === "Labor" ||
          currentRouteName === "Employee"
        ) {
          setIsOpenAccountStack(false);
          setIsOpenEmployeeStack(false);
          setIsOpenHomeStacks(true);
          setIsOpenRequestsMyFarmsStack(false);
          setIsOpenRequestsOtherFarmsStack(false);
        }
        if (currentRouteName === "UserInformation") {
          setIsOpenAccountStack(true);
          setIsOpenEmployeeStack(false);
          setIsOpenHomeStacks(false);
          setIsOpenRequestsMyFarmsStack(false);
          setIsOpenRequestsOtherFarmsStack(false);
        }
        if (currentRouteName === "RequestsMyFarms") {
          setIsOpenAccountStack(false);
          setIsOpenEmployeeStack(false);
          setIsOpenHomeStacks(false);
          setIsOpenRequestsMyFarmsStack(true);
          setIsOpenRequestsOtherFarmsStack(false);
        }
        if (currentRouteName === "RequestsOtherFarms") {
          setIsOpenAccountStack(false);
          setIsOpenEmployeeStack(false);
          setIsOpenHomeStacks(false);
          setIsOpenRequestsMyFarmsStack(false);
          setIsOpenRequestsOtherFarmsStack(true);
        }
      }}
    >
      <Menu.Navigator
        drawerContent={(props) => (
          userToken !== null ?
          (<MenuItems
            statusOpenAccountStack={isOpenAccountStack}
            statusOpenHomeStacks={isOpenHomeStacks}
            statusOpenEmployeeStack={isOpenEmployeeStack}
            statusOpenRequestsMyFarmsStack={isOpenRequestsMyFarmsStack}
            statusOpenRequestsOtherFarmsStack={isOpenRequestsOtherFarmsStack}
            {...props}
          />):null
        )}
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#348800",
            borderRadius: 10,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          },
          drawerPosition: "right",
          headerShown: false,
        }}
      >
        { userToken === null ?
        
          
        (<> 
            <Menu.Screen name='Homee' component={MainStack} />
        </>):
        (
          <>
        
        <Menu.Screen name="Mis fincas" component={HomeStacks} />
        <Menu.Screen name="Administrar perfil" component={AccountStack} />
        <Menu.Screen name="Fincas" component={EmployeeStack} />
        <Menu.Screen name="Solicitudes mis fincas" component={RequestsMyFarmsStack}/>
        <Menu.Screen name="Solicitudes otras fincas" component={RequestsOtherFarmsStack}/>
        </>
        )
}
      </Menu.Navigator>
      </NavigationContainer>
  );
}

export default MyMenu;
