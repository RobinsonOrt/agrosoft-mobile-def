import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RequestTable1 } from "../components/RequestTable1";
import MyRequestsOtherFarmsContext from "../context/RequestsOtherFarmsContext";


export default function RequestsOtherFarms({ navigation }) {

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas")
    return true;
  })

  const { otherRequests, LoadOtherRequests, AcceptRequest, RejectRequest } = useContext(MyRequestsOtherFarmsContext);

  const incoming = (
    otherRequests.length > 0 ? (
    otherRequests.map((request, index) => {
      return (
        <View style={tw`bg-gray-200 w-full items-center flex-row p-4 pt-2 mt-4 rounded-xl`} key={index}>
          <View style={tw`w-1/3 items-center`}>
            <Text style={tw`text-center`}>{request.nameFarm}</Text>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.name}</Text>
            <TouchableOpacity style={tw`bg-green-500 items-center w-90px h-31px pt-1 mt-3 rounded-xl`} onPress={()=>AcceptRequest(request.idRequest)}><Text style={tw`text-white text-center grow font-bold `}>Aceptar</Text></TouchableOpacity>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.createdDate.split("T")[0]}</Text>
            <TouchableOpacity style={tw`bg-red-500 items-center w-90px h-31px pt-1 mt-3 rounded-xl`} onPress={()=>RejectRequest(request.idRequest)}><Text style={tw`text-white text-center grow font-bold `}>Rechazar</Text></TouchableOpacity>
          </View>
        </View>
      )
    })) : (<Text style={tw`text-center text-gray-500`}>No hay solicitudes entrantes</Text>)
  )

  const registers = (
    otherRequests.length > 0 ? (
    otherRequests.map((request, index) => {
      return (
        <View style={tw`bg-gray-200 w-full items-center flex-row p-4 pt-2 mt-4 rounded-xl`} key={index}>
          <View style={tw`w-1/3 items-center`}>
            <Text style={tw`text-center`}>{request.nameFarm}</Text>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.name}</Text>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.stateRequest}</Text>
          </View>
        </View>
      )
    })) : (<Text style={tw`text-center text-gray-500`}>No hay registros de solicitudes</Text>)
  )

  useEffect(() => {
    LoadOtherRequests("1", 0);
  }, []);
  return (

    <>
      <Text style={tw`text-4xl font-bold text-center text-black mt-10 mb-10`}>
        Solicitudes
      </Text>

      <View style={styles.safeArea}>
        <View style={styles.container}>

          <RequestTable1 title="Entrantes" children={incoming} children1={registers} />

        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
});