import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Picker, StyleSheet, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";

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
import SubHeader from "../components/SubHeader";
import { AccordionEmployees } from "../components/AccordionEmployees";
import ButtonCard from "../components/ButtonCard";
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";

const Labor = ({ navigation }) => {
  const [isModalOpenAddLabor, setIsModalOpenAddLabor] = useState(false);
  const [isModalOpenModifyLabor, setIsModalOpenModifyLabor] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const { LoadLabors, labors, setLabor, sorters, FindLabors, DeleteLabor } = useContext(MyLaborsContext);

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  })

  useEffect(() => {
    LoadLabors();
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
      <SubHeader title={"Administrar Cargos"} />
      <ScrollView style={tw`h-95%`} >
        <View style={styles.container}>
          <View style={tw`flex-row justify-between mb-4`}>
            <View style={tw``}>
              <SorterComponent sorters={sorters} sorter={"name_sub_role"} GetElements={LoadLabors}/>
            </View>
            <View style={tw`items-end`}>
              <SearchComponent GetElements={FindLabors} GetOriginalElements={LoadLabors}/>
              <AddButton onPress={() => setIsModalOpenAddLabor(!isModalOpenAddLabor)} />
            </View>
          </View>
          <ModalAddLabor
            isModalOpenAddLabor={isModalOpenAddLabor}
            setIsModalOpenAddLabor={setIsModalOpenAddLabor}
          />
          <ModalModifyLabor
            isModalOpenModifyLabor={isModalOpenModifyLabor}
            setIsModalOpenModifyLabor={setIsModalOpenModifyLabor}
          />

          <ModalDelete
              isModalOpenDelete={isModalOpenDelete}
              setIsModalOpenDelete={setIsModalOpenDelete}
              DeleteFunction={DeleteLabor}
          />

          {labors.length > 0 ? (
            labors.map((labor, index) => {
              return (
                <AccordionEmployees name={labor.nameSubRole}text={"descripcion"} value={labor.descriptionSubRole} hei={140} key={index} >
                  <View style={[tw`w-full flex flex-row justify-between`]}>
                    <ButtonCard text={"Editar"} onPress={() => {setLabor(labor), setIsModalOpenModifyLabor(!isModalOpenModifyLabor)}} color={"rgba(234, 179, 8, 1)"} icon={<Feather name="edit-3" size={18} color="white" />} />
                    <ButtonCard text={"Eliminar"} onPress={() => {global.idToDelete = labor.idSubRole, setIsModalOpenDelete(!isModalOpenDelete)}} color={"rgba(239, 68, 68, 1)"} icon={<AntDesign name="delete" size={18} color="white" />} />
                    <ButtonCard text={"Actividades"} onPress={() => {console.log("hdhd")}} color={"rgba(32, 84, 0, 0.81)"} icon={<MaterialIcons name="notes" size={18} color="white" />} />
                  </View>
                </AccordionEmployees>
                
              )
            })) : (
            <View style={styles.container}>
              <Text style={tw`text-center text-gray-500`}>
                No se encontraron resultados
              </Text>
            </View>
          )}
        </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>



  );
}

export default Labor;