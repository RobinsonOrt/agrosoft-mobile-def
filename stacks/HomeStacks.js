import global from "../global";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { CommonActions, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Profile from "../assets/profile.png";
import Agrosoft from "../assets/agrosoft.png";
import tw from "twrnc";
import EnterFarm from "../screens/EnterFarm";
import MyFarms from "../screens/MyFarms";
import Labor from "../screens/Labor";
import Employee from "../screens/Employee";
import CoffeeBush from "../screens/CoffeeBush";
import ActivitiesMyFarms from "../screens/ActivitiesMyFarms";
import EnterCoffeeBush from "../screens/EnterCoffeeBush";
import Fields from "../screens/Fields";
import AssignedCrops from "../screens/AssignedCrops";
import AdminCropsActivitys from "../screens/AdminCropsActivitys";
import CropsRecords from "../screens/CropsRecords";
import AdminBushActivitys from "../screens/AdminBushActivitys";

import { MyFarmsProvider } from "../context/FarmContext";
import { MyEmployeesProvider } from "../context/EmployeeContext";
import { MyLaborsProvider } from "../context/LaborsContext";
import { MyCropsProvider } from "../context/CropContext";
import { MyCoffeeBushProvider } from "../context/CoffeeBushContext";
import { MyActivitiesProvider } from "../context/ActivityContext";
import { MyFieldsProvider } from "../context/FieldsContext";
import { MyCropUserProvider } from "../context/CropUserContext";
//import { MyCoffeeBushProvider } from ".../context/CoffeeBushContext";
import Farms from "../screens/Farms";
import Hamburger from "../assets/hamburger.png";
import Header from "../components/Header";
import { SimpleLineIcons } from "@expo/vector-icons";
import { HeaderTitle, HeaderRight, styles } from "../components/Header";

import ClassModalAddCropUser from "../components/ClassModalAddCropUser";

const HomeStacks = ({ navigation }) => {
  const HomeStack = createNativeStackNavigator();
  return (
    <MyFarmsProvider>
      <MyCropsProvider>
        <MyCoffeeBushProvider>
          <MyActivitiesProvider>
            <MyFieldsProvider>
              <MyEmployeesProvider>
                <MyLaborsProvider>
                  <MyCropUserProvider>
                    <HomeStack.Navigator
                      screenOptions={{
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerRight: () => (
                          <HeaderRight navigation={navigation} />
                        ),
                        headerTitle: () => (
                          <HeaderTitle navigation={navigation} />
                        ),
                        headerTitleAlign: "center",
                      }}
                    >
                      <HomeStack.Screen name="MyFarms" component={MyFarms} />
                      <HomeStack.Screen
                        name="EnterFarm"
                        component={EnterFarm}
                      />
                      <HomeStack.Screen name="Labor" component={Labor} />
                      <HomeStack.Screen name="Employee" component={Employee} />
                      <HomeStack.Screen
                        name="CoffeeBush"
                        component={CoffeeBush}
                      />
                      <HomeStack.Screen
                        name="ActivitiesMyFarms"
                        component={ActivitiesMyFarms}
                      />
                      <HomeStack.Screen
                        name="EnterCoffeeBush"
                        component={EnterCoffeeBush}
                      />
                      <HomeStack.Screen name="Fields" component={Fields} />
                      <HomeStack.Screen
                        name="AssignedCrops"
                        component={AssignedCrops}
                      />
                      <HomeStack.Screen
                        name="AddCropUser"
                        component={ClassModalAddCropUser}
                      />
                      <HomeStack.Screen
                        name="CropsActivitys"
                        component={AdminCropsActivitys}
                      />
                      <HomeStack.Screen
                        name="CropsRecords"
                        component={CropsRecords}
                      />
                      <HomeStack.Screen
                        name="BushActivitys"
                        component={AdminBushActivitys}
                      />
                    </HomeStack.Navigator>
                  </MyCropUserProvider>
                </MyLaborsProvider>
              </MyEmployeesProvider>
            </MyFieldsProvider>
          </MyActivitiesProvider>
        </MyCoffeeBushProvider>
      </MyCropsProvider>
    </MyFarmsProvider>
  );
};

export default HomeStacks;
