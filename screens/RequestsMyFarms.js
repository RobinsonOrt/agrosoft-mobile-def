import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import tw from "twrnc";
import { RequestTable } from "../components/RequestTable";
import { useBackHandler } from "@react-native-community/hooks";
import ModalAddRequest from "../components/ModalAddRequest";
import MyRequestsMyFarmsContext from "../context/RequestsMyFarmsContext";
import MyFarmsContext from "../context/FarmContext";

export default function RequestsMyFarms({ navigation }) {

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas")
    return true;
  })

  const [isModalOpenAddRequest, setIsModalOpenAddRequest] = useState(false);
  const { myRequests, LoadMyRequests, CancelRequest } = useContext(MyRequestsMyFarmsContext);
  const { LoadAllFarms } = useContext(MyFarmsContext);  


  const outgoing = (
    myRequests.length > 0 ? (
    myRequests.map((request, index) => {
      return (
        <View style={tw`bg-gray-200 w-full items-center flex-row p-4 pt-2 mt-4 rounded-xl`} key={index}>
          <View style={tw`w-1/3 items-center`}>
            <Text style={tw`text-center`}>{request.nameFarm}</Text>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.name}</Text>
          </View>
          <View style={tw`w-1/3 items-center`}>
            <Text>{request.createdDate.split("T")[0]}</Text>
            <TouchableOpacity style={tw`bg-red-500 items-center w-full h-31px pt-1 mt-3 rounded-xl`} onPress={()=>CancelRequest(request.idRequest)}><Text style={tw`text-white text-center grow font-bold `}>Cancelar</Text></TouchableOpacity>
          </View>
        </View>
      )
    })): (<Text style={tw`text-center text-gray-500`}>No hay solicitudes enviadas</Text>)
  )

  const registers = (
    myRequests.length > 0 ? (
    myRequests.map((request, index) => {
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
    })): (<Text style={tw`text-center text-gray-500`}>No hay Registros de solicitudes</Text>)
  )
  useEffect(() => {
      LoadMyRequests("1", 0);
    }, []);
  return (

    <>
      <Text style={tw`text-4xl font-bold text-center text-black mt-10 mb-10`}>
        Solicitudes
      </Text>
      <ModalAddRequest
            isModalOpenAddRequest={isModalOpenAddRequest}
            setIsModalOpenAddRequest={setIsModalOpenAddRequest}
          />
      <View style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity
              onPress={() => {
                LoadAllFarms();
                setIsModalOpenAddRequest(!isModalOpenAddRequest)}}
              style={tw`bg-green-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 mt-7 text-center`}
            >
              
              <Text style={tw`text-lg text-white text-center`}>
                Crear Solicitud
              </Text>
            </TouchableOpacity>
          <RequestTable title="Salientes" children={outgoing} children1={registers} />

        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
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