import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Info from "../assets/info.png";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import MyFarmsContext from "../context/FarmContext";
import MyEmployeesContext from "../context/EmployeeContext";
import { useBackHandler } from "@react-native-community/hooks";
import { Accordion } from "../components/Accordion";


export default function Farms({ navigation }){
  const { LoadEmployeedFarms, employeedFarms } = useContext(MyFarmsContext)
  const { LeaveFarm, error, message } = useContext(MyEmployeesContext)

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas")
    return true;
  })

  useEffect(async () => {
    await LoadEmployeedFarms("name_farm", "asc", 0);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {error? <Text>{message}</Text>:null}
        <View style={styles.container}>
          {(employeedFarms.length > 0) ? (
           
          employeedFarms.map((farm, index) => {
            return (
              <Accordion title={farm.nameFarm} key={index} >
                <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  <TouchableOpacity style={tw`bg-blue-500 justify-between items-center flex-row w-full h-52px  p-4 mt-3 rounded-xl`}><Text style={tw`text-white text-center grow font-bold `}>Ver info</Text><Image source={Info} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>
                  <TouchableOpacity style={tw`bg-green-500 justify-between items-center flex-row w-full h-52px p-4 mt-3 rounded-xl`}><Text style={tw`text-white text-center grow font-bold`}>Ingresar</Text><Image source={Enter} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>
                  <TouchableOpacity style={tw`bg-red-500 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`} onPress={()=>{LeaveFarm(global.idUser, farm.idFarm)}} ><Text style={tw`text-white text-center grow font-bold`} >Abandonar</Text><Image source={Leave} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>
                </View>
              </Accordion>
            )
          })
        
          ): (<View style={styles.container}>
            <Text style={tw`text-center text-gray-500`}>No se encontraron resultados</Text>
          </View>)}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 10,


  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: '5%',
    marginTop: '5px',

  },
  sectionDescription: {
    fontSize: 20,
    fontFamily: 'Roboto',
    height: 30,
    marginLeft: '5%',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
});