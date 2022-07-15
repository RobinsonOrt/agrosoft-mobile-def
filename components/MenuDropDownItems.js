import React, { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import tw from "twrnc";
import MenuButtonItem from "./MenuButtonItem";
import { useDrawerStatus } from '@react-navigation/drawer';
import MenuButtonDropDown from "./MenuButtonDropDown";
import Profile from "../assets/profileMini.png";
import Admin from "../assets/Admin.png"
import Employee from "../assets/Employee.png"
import Requests from "../assets/requests.png"

export const MenuDropDownItems = ({ navigation, statusUser, statusAdmin, statusEmployee, statusRequestsMyFarms, statusRequestsOtherFarms }) => {
  
  const [isOpenUser, setIsOpenUser] = useState(statusUser);
  const [isOpenAdmin, setIsOpenAdmin] = useState(statusAdmin);
  const [isOpenEmployee, setIsOpenEmployee] = useState(statusEmployee);
  const [isOpenRequests, setIsOpenRequests] = useState(statusRequestsMyFarms || statusRequestsOtherFarms);

  const isCloseDrawer = useDrawerStatus() === 'closed';
  
    useEffect(() => {
      if(isCloseDrawer){
        setIsOpenUser(false)
        setIsOpenAdmin(false)
        setIsOpenEmployee(false)
        setIsOpenRequests(false)
      }      
    });

  const resetAccountStack = () => {
    
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'UserInformation',
          },
        ],
      })
  }  

  const resetHomeStack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MyFarms',
        },
      ],
    })
    
  }

  const resetEmployeeStack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Farms',
        },
      ],
    })
    
  }
  const resetRequestsMyFarmsStack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'RequestsMyFarms',
        },
      ],
    })

  }

  const resetRequestsOtherFarmStack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'RequestsOtherFarms',
        },
      ],
    })

  }

  const toggleOpenUser = () => {
    if(statusUser){
        setIsOpenUser(statusUser);
    }else{
        setIsOpenUser(value => !value);
        setIsOpenAdmin(false)
        setIsOpenEmployee(false)
        setIsOpenRequests(false)
    }
  }

  const toggleOpenAdmin = () => {
    if(statusAdmin){
        setIsOpenAdmin(statusAdmin);
    }else{
        setIsOpenUser(false);
        setIsOpenAdmin(value => !value)
        setIsOpenEmployee(false)
        setIsOpenRequests(false)
    }
  }

  const toggleOpenEmployee = () => {
    if(statusEmployee){
        setIsOpenEmployee(statusEmployee);
    }else{
        setIsOpenUser(false);
        setIsOpenAdmin(false)
        setIsOpenEmployee(value => !value)
        setIsOpenRequests(false)
    }
  }

  const toggleOpenRequests = () => {
    if(statusRequestsMyFarms || statusRequestsOtherFarms){
        setIsOpenRequests(true);
    }else{
        setIsOpenUser(false);
        setIsOpenAdmin(false)
        setIsOpenEmployee(false)
        setIsOpenRequests(value => !value)
    }
  }

  const styleView = tw`mx-5 rounded-md rounded-t-none mb-8` 

  return (
    <>
      <View style={tw`mb-10`}>
        <MenuButtonDropDown title={"Usuario"} onPress={toggleOpenUser} isOpen={isOpenUser} status={statusUser} image={Profile} styleImage={tw`h-14px w-13px`} activeOpacity={0.6}/>
            <View style={[styles.list, styleView, styles.container, !statusUser && !isOpenUser ? styles.hidden : undefined]}>
        <MenuButtonItem status={statusUser} text = "Perfil" onPress={ () => {navigation.navigate("Administrar perfil"); resetAccountStack()}}/>
        </View>

        <MenuButtonDropDown title={"Administrador"} onPress={toggleOpenAdmin} isOpen={isOpenAdmin} status={statusAdmin} image={Admin} styleImage={tw`h-14px w-18px`} activeOpacity={0.6}/>
        <View style={[styles.list, styleView, styles.container, !statusAdmin && !isOpenAdmin ? styles.hidden : undefined]}>
            <MenuButtonItem status={statusAdmin} text = "Mis Fincas" onPress={ () => {navigation.navigate("Mis fincas"); resetHomeStack()}}/>
        </View>

        <MenuButtonDropDown title={"Empleado"} onPress={toggleOpenEmployee} isOpen={isOpenEmployee} status={statusEmployee} image={Employee} styleImage={tw`h-15px w-14px`} activeOpacity={0.6}/>
        <View style={[styles.list, styleView, styles.container, !statusEmployee && !isOpenEmployee ? styles.hidden : undefined]}>
            <MenuButtonItem status={statusEmployee} text = "Fincas" onPress={ () => {navigation.navigate("Fincas"); resetEmployeeStack()}}/>
        </View>

        <MenuButtonDropDown title={"Solicitudes"} onPress={toggleOpenRequests} isOpen={isOpenRequests} status={statusRequestsMyFarms || statusRequestsOtherFarms} image={Requests} styleImage={tw`h-16px w-23px`} activeOpacity={0.6}/>
        <View style={[styles.list, styleView, styles.container, (!statusRequestsMyFarms && !statusRequestsOtherFarms) && !isOpenRequests ? styles.hidden : undefined]}>
            <MenuButtonItem status={statusRequestsMyFarms} text = "Mis fincas" onPress={ () => {navigation.navigate("Solicitudes mis fincas"); resetRequestsMyFarmsStack()}}/>
            <MenuButtonItem status={statusRequestsOtherFarms} text = "Otras fincas" onPress={ () => {navigation.navigate("Solicitudes otras fincas"); resetRequestsOtherFarmStack()}}/>
        </View>
      </View>   
    </>
  );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: "rgba(88, 155, 47, 0.5)",
    },
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden'
    },
  });