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
import MenuButtonItem from "../components/MenuButtonItem";

import { Accordion } from "../components/MenuButtonAccordion";


const Menu = createDrawerNavigator();




export function MyMenu (){
    const routeNameRef = React.useRef()
    const navigationRef = React.useRef()
    const [isOpenAccountStack, setIsOpenAccountStack] = useState(false)
    const [isOpenHomeStacks, setIsOpenHomeStacks] = useState(false)
    const [isOpenEmployeeStack, setIsOpenEmployeeStack] = useState(false)
    const [isOpenRequestsMyFarmsStack, setIsOpenRequestsMyFarmsStack] = useState(false)
    const [isOpenRequestsOtherFarmsStack, setIsOpenRequestsOtherFarmsStack] = useState(false)
    

    return (
      
    <NavigationContainer ref={navigationRef}
    onReady={() =>
      (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
    }
    onStateChange={() => {
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      if(currentRouteName === "Farms"){
        setIsOpenAccountStack(false)
        setIsOpenEmployeeStack(true)
        setIsOpenHomeStacks(false)
        setIsOpenRequestsMyFarmsStack(false)
        setIsOpenRequestsOtherFarmsStack(false)
      }
      if(currentRouteName === "MyFarms"){
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
      

      // Save the current route name for later comparision
      //routeNameRef.current = currentRouteName;
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
                  backgroundColor: 'white',              
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



const MenuItems = ({ navigation, statusOpenAccountStack, statusOpenHomeStacks, statusOpenEmployeeStack, statusOpenRequestsMyFarmsStack, statusOpenRequestsOtherFarmsStack }) => {
  
  return(
    <DrawerContentScrollView>
        <MenuButtonItem status={statusOpenAccountStack} text = "Administrar perfil"
        onPress={ () => navigation.navigate("Administrar perfil")}/>
        <Accordion status={statusOpenHomeStacks} title = "Administrador">
          {<MenuButtonItem status={statusOpenHomeStacks} text = "Mis Fincas"
        onPress={ () => navigation.navigate("Mis fincas")}/>}
        </Accordion>
        <Accordion status={statusOpenEmployeeStack} title = "Empleado">
          {<MenuButtonItem status={statusOpenEmployeeStack} text = "Fincas"
        onPress={ () => navigation.navigate("Fincas")}/>}
        </Accordion>
        <Accordion status={statusOpenEmployeeStack} title = "Solicitudes">
          {<MenuButtonItem status={statusOpenRequestsMyFarmsStack} text = "Mis Fincas"
        onPress={ () => navigation.navigate("Solicitudes mis fincas")}/>}
          {<MenuButtonItem status={statusOpenRequestsOtherFarmsStack} text = "Otras Fincas"
          onPress={ () => navigation.navigate("Solicitudes otras fincas")}/>}
        </Accordion>
           
    </DrawerContentScrollView>


  )
}