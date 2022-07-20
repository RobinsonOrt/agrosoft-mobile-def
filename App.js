/*
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={({navigation}) => ({
      title: "Home",
      headerStyle: {
        backgroundColor: "rgb(0, 145, 234)",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
      },
      headerLeft: () => (
          <Ionicons
            name={'md-menu'}
            size={24}
            style={{ marginLeft: 10 }}
            onPress={() =>
              navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
        ),
    })} />
  </Stack.Navigator>
);

const Home = () => {
  return (
  <View>
    <Text>This is Home</Text>
  </View>
)}

export default () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack">
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="HomeNoStack" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
*/
/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator  } from 'react-navigation';
import Home from '../screens/Home';
//import ProductsScreen from './ProductsScreen';
//import CartScreen from './CartScreen';

const CategoryNavigator = createStackNavigator({
  CategoryList: {
    screen: Home,
    navigationOptions: {
      title: "Home",
      
    },
  },
});

const drawerScreens = createDrawerNavigator({
  Category: CategoryNavigator,
  Products: ProductNavigator,
}, {
  initialRouteName: 'Home',
})




export default AppStack = createStackNavigator({
  drawer: {
    screen: drawerScreens,
  },
}, {
  headerMode: 'float', // set this header mode to float so you can share the header
  initialRouteName: 'drawer',
});
*/
/*import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.openDrawer()}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}*/

import "react-native-gesture-handler";
import { NativeRouter, Route, Routes } from "react-router-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AuthProvider } from "./context/AuthContext";
import TokenValidation from "./screens/TokenValidation";
import PasswordRecovery from "./screens/PasswordRecovery";
import TokenValidationTwo from "./screens/TokenValidationTwo";
import PasswordRecoveryForm from "./screens/PasswordRecoveryForm";
import UserLoged from "./screens/UserLoged";
import TokenVerificated from "./screens/TokenVerificated";
import NotConected from "./screens/NotConected";
import HomeStacks from "./stacks/HomeStacks";
import MyMenu from "./stacks/MyMenu";
import UserInformation from "./screens/UserInformation";
import MyFarms from "./screens/MyFarms";
import { NavigationContainer } from "@react-navigation/native";
import EnterFarm from "./screens/EnterFarm";
import Farms from "./screens/Farms";
import Requests from "./screens/Requests";
import Login2 from "./screens/Login2";
import Loginn from "./components/Loginn";
import { MyFarmsProvider } from "./context/FarmContext";
import { CountryProvider } from "./context/CoutryContext";
import EmployeeCrops from "./screens/EmployeeCrops";
import EmployeeShrubbery from "./screens/EmployeeShrubbery";
import CropsActivitys from "./screens/CropsActivitys";
import CropsRecords from "./screens/CropsRecords";
import BushActivitys from "./screens/BushActivitys";

export default function App() {
  return (
    <CountryProvider>
      <AuthProvider>
        <MyFarmsProvider>
          <NativeRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Loginn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tokenValidation" element={<TokenValidation />} />
              <Route path="/passwordRecovery" element={<PasswordRecovery />} />
              <Route
                path="/tokenValidationPassword"
                element={<TokenValidationTwo />}
              />
              <Route
                path="/passwordRecoveryForm"
                element={<PasswordRecoveryForm />}
              />
              <Route path="/userLoged" element={<MyMenu />} />
              <Route path="/accountActivated" element={<TokenVerificated />} />
              <Route path="/notConected" element={<NotConected />} />
              <Route path="/userInformation" element={<UserInformation />} />
              <Route path="/enterFarm22" element={<EnterFarm />} />
              <Route path="/employeecrops" element={<EmployeeCrops />} />
              <Route
                path="/employeeshrubbery"
                element={<EmployeeShrubbery />}
              />
              <Route
                path="/cropsactivitys/:idFarm"
                element={<CropsActivitys />}
              />
              <Route path="/cropsrecords/:idActivity" element={<CropsRecords />} />
              <Route path="/bushactivitys/:idFarm" element={<BushActivitys />} />
            </Routes>
          </NativeRouter>
        </MyFarmsProvider>
      </AuthProvider>
    </CountryProvider>
  );
}
