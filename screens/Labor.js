import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Picker, StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";

import { Link } from "react-router-native";
import tw from "twrnc";
import ModalAddLabor from "../components/ModalAddLabor";
import ModalFarmDelete from "../components/ModalFarmDelete";
import Home from "./Home";
import { Accordion } from "../components/Accordion";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Info from "../assets/info.png";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import Edit from "../assets/edit.png";
import { styles } from "./Farms";
import { useBackHandler } from "@react-native-community/hooks";
import ModalLaborDelete from "../components/ModalLaborDelete";
import ModalModifyLabor from "../components/ModalModifyLabor";
import MyLaborsContext from "../context/LaborsContext";




const Labor = ({ navigation }) => {
  const [isModalOpenAddLabor, setIsModalOpenAddLabor] = useState(false);
  const [isModalOpenModifyLabor, setIsModalOpenModifyLabor] = useState(false);

  const [isModalOpenLaborDelete, setIsModalOpenLaborDelete] = useState(false);

  const { LoadLabors, labors, setLabor } = useContext(MyLaborsContext);

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  })

  useEffect(() => {
    LoadLabors("name_sub_role", "asc");
  }, []);
  return (



    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setIsModalOpenAddLabor(!isModalOpenAddLabor)}
            style={tw`bg-green-500 text-lg float-left text-white px-5 py-3 w-215px rounded-lg mb-7 mt-7 text-center`}
          >
            <Text style={tw`text-lg text-white text-center`}>Agregar cargo</Text>
          </TouchableOpacity>
          <ModalAddLabor isModalOpenAddLabor={isModalOpenAddLabor} setIsModalOpenAddLabor={setIsModalOpenAddLabor} />
          <ModalModifyLabor isModalOpenModifyLabor={isModalOpenModifyLabor} setIsModalOpenModifyLabor={setIsModalOpenModifyLabor} />
          <ModalLaborDelete isModalOpenLaborDelete={isModalOpenLaborDelete} setIsModalOpenLaborDelete={setIsModalOpenLaborDelete} />
          {labors.length > 0 ? (
          labors.map((labor, index) => {
            return (
              <Accordion title={labor.nameSubRole} key={index}>
                <View style={tw`bg-gray-300 w-full p-4 pt-3 mt-1 rounded-xl`}>
                  <TextInput
                    style={tw`bg-gray-200 px-5 py-2 rounded-lg w-full h-83px`}
                    multiline={true}
                    value={labor.descriptionSubRole}
                    editable={false}
                  />
                  <TouchableOpacity style={tw`bg-yellow-500 justify-between items-center flex-row w-full h-52px p-4 mt-3 rounded-xl`} ><Text style={tw`text-white text-center grow font-bold`}>Actividades</Text><Image source={Enter} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>
                  <TouchableOpacity style={tw`bg-yellow-400 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`} onPress={() => {
                                                                                                                                                setLabor(labor);
                                                                                                                                                setIsModalOpenModifyLabor(!isModalOpenModifyLabor)}}><Text style={tw`text-white text-center grow font-bold`}>Editar</Text><Image source={Edit} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>
                  <TouchableOpacity style={tw`bg-red-500 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`} onPress={() => {global.idLabor = labor.idSubRole;
                                                                                                                                            setIsModalOpenLaborDelete(!isModalOpenLaborDelete)}}><Text style={tw`text-white text-center grow font-bold`}>Eliminar</Text><Image source={Leave} style={tw`h-24px w-24px float-right`} /></TouchableOpacity>

                </View>
              </Accordion>
            )
          })) : (<Text style={tw`text-center text-gray-500`}>No hay labores registradas</Text>)}





        </View>
      </SafeAreaView>
    </SafeAreaProvider>



  );
}

export default Labor;