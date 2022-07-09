import "react-native-gesture-handler";
import global from "../global";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import HomeStacks from "./HomeStacks";
import AccountStack from "./AccountStack";
import EmployeeStack from "./EmployeeStack";
import RequestsMyFarmsStack from "./RequestsMyFarmsStack";
import RequestsOtherFarmsStack from "./RequestsOtherFarmsStack";
import { MenuItems } from "../components/MenuItems";
import MenuButtonItem from "../components/MenuButtonItem";

const Menu = createDrawerNavigator();

export function MyMenu (){
    const routeNameRef = React.useRef()
    const navigationRef = React.useRef()
    const [isOpenAccountStack, setIsOpenAccountStack] = useState(false)
    const [isOpenHomeStacks, setIsOpenHomeStacks] = useState(false)
    const [isOpenEmployeeStack, setIsOpenEmployeeStack] = useState(false)
    const [isOpenRequestsMyFarmsStack, setIsOpenRequestsMyFarmsStack] = useState(false)
    const [isOpenRequestsOtherFarmsStack, setIsOpenRequestsOtherFarmsStack] = useState(false)
    //const [stateNavigation, setStateNavigation] = useState({})

    
    //setStateNavigation(h.data.respond)
    /*const changeState = (state) => {
      if(stateNavigation === {}){
        setStateNavigation({
          routes: [
            { name: "Administrar Fincas" },
            { name: "Mis Fincas" },
            { name: "Fincas" },
            { name: "Solicitudes mis fincas" },
            { name: "Solicitudes otras fincas" }
          ]
        })
      }
      else{
        setStateNavigation(state)
      }

    }*/

    //console.log("Este es el estado "+stateNavigation)
    
    
  


    var hola;

    return (
      
    <NavigationContainer 
    
    ref={navigationRef}
    //initialState={stateNavigation}

    onReady={() =>
      {(routeNameRef.current = navigationRef.current);}

    }
    onStateChange={(state) => {
      
      //changeState(state)
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      console.log(currentRouteName)
      //console.log(routeNameRef.current.getCurrentRoute('Fincas'))
      
    
      if(currentRouteName === "Farms"){
        setIsOpenAccountStack(false)
        setIsOpenEmployeeStack(true)
        setIsOpenHomeStacks(false)
        setIsOpenRequestsMyFarmsStack(false)
        setIsOpenRequestsOtherFarmsStack(false)
      }
      if(currentRouteName === "MyFarms" || currentRouteName === "EnterFarm" || currentRouteName === "Labor" || currentRouteName === "Employee" ){
        setIsOpenAccountStack(false)
        setIsOpenEmployeeStack(false)
        setIsOpenHomeStacks(true)
        setIsOpenRequestsMyFarmsStack(false)
        setIsOpenRequestsOtherFarmsStack(false)
      }
      if(currentRouteName === "UserInformation"){
        setIsOpenAccountStack(true)
        setIsOpenEmployeeStack(false)
        setIsOpenHomeStacks(false)
        setIsOpenRequestsMyFarmsStack(false)
        setIsOpenRequestsOtherFarmsStack(false)
      }
      if(currentRouteName === "RequestsMyFarms"){
        setIsOpenAccountStack(false)
        setIsOpenEmployeeStack(false)
        setIsOpenHomeStacks(false)
        setIsOpenRequestsMyFarmsStack(true)
        setIsOpenRequestsOtherFarmsStack(false)
      }
      if(currentRouteName === "RequestsOtherFarms"){
        setIsOpenAccountStack(false)
        setIsOpenEmployeeStack(false)
        setIsOpenHomeStacks(false)
        setIsOpenRequestsMyFarmsStack(false)
        setIsOpenRequestsOtherFarmsStack(true)
      }
    }}>
        <Menu.Navigator drawerContent={ (props) => <MenuItems 
                statusOpenAccountStack={isOpenAccountStack} 
                statusOpenHomeStacks={isOpenHomeStacks} 
                statusOpenEmployeeStack={isOpenEmployeeStack}
                statusOpenRequestsMyFarmsStack={isOpenRequestsMyFarmsStack}
                statusOpenRequestsOtherFarmsStack={isOpenRequestsOtherFarmsStack} { ...props}/> } 
            
            initialRouteName="Mis fincas" 
            screenOptions={{
                drawerStyle: {
                  backgroundColor: '#348800',
                  borderRadius: 8,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,              
                },
                drawerPosition: 'right',
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#EAB308',
                    position: 'fixed',
                }, 
  }}>
            <Menu.Screen name="Administrar perfil" component={AccountStack} />
            <Menu.Screen name="Mis fincas" component={HomeStacks}/>
            <Menu.Screen name="Fincas" component={EmployeeStack}/>
            <Menu.Screen name="Solicitudes mis fincas" component={RequestsMyFarmsStack}/>
            <Menu.Screen name="Solicitudes otras fincas" component={RequestsOtherFarmsStack}/> 
        </Menu.Navigator>
        </NavigationContainer>
    );     
}

export default MyMenu;
