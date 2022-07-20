import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStacks from "./HomeStacks";
import AccountStack from "./AccountStack";
import EmployeeStack from "./EmployeeStack";
import RequestsMyFarmsStack from "./RequestsMyFarmsStack";
import RequestsOtherFarmsStack from "./RequestsOtherFarmsStack";
import { MenuItems } from "../components/MenuItems";

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
          <MenuItems
            statusOpenAccountStack={isOpenAccountStack}
            statusOpenHomeStacks={isOpenHomeStacks}
            statusOpenEmployeeStack={isOpenEmployeeStack}
            statusOpenRequestsMyFarmsStack={isOpenRequestsMyFarmsStack}
            statusOpenRequestsOtherFarmsStack={isOpenRequestsOtherFarmsStack}
            {...props}
          />
        )}
        initialRouteName="Mis fincas"
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
        <Menu.Screen name="Administrar perfil" component={AccountStack} />
        <Menu.Screen name="Mis fincas" component={HomeStacks} />
        <Menu.Screen name="Fincas" component={EmployeeStack} />
        <Menu.Screen name="Solicitudes mis fincas" component={RequestsMyFarmsStack}/>
        <Menu.Screen name="Solicitudes otras fincas" component={RequestsOtherFarmsStack}/>
      </Menu.Navigator>
    </NavigationContainer>
  );
}

export default MyMenu;
