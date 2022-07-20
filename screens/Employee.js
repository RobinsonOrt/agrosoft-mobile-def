import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import { Feather, EvilIcons, AntDesign } from '@expo/vector-icons';

import tw from "twrnc";
import ModalAddLabor from "../components/ModalAddLabor";
import SubHeader from "../components/SubHeader";
import { AccordionEmployees } from "../components/AccordionEmployees";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Farms";
import { useBackHandler } from "@react-native-community/hooks";
import ModalEmployeeDelete from "../components/ModalEmployeeDelete";
import MyEmployeesContext from "../context/EmployeeContext";
import ModalChangeLabor from "../components/ModalChangeLabor";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import Pagination from "../components/Pagination";
import FieldsItems from "../components/FieldsItems";
import ModalDelete from "../components/ModalDelete";

const Employee = ({ navigation }) => {
  const [isModalOpenAddLabor, setIsModalOpenAddLabor] = useState(false);
  const [isModalOpenChangeLabor, setIsModalOpenChangeLabor] = useState(false);
  const [isModalOpenEmployeeDelete, setIsModalOpenEmployeeDelete] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const { LoadEmployees, employees, sorters, maxPage, FindEmployees, DeleteEmployee, setSelectedUserRole } = useContext(MyEmployeesContext);

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    LoadEmployees();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Administrar Empleados"} />
        <ScrollView style={tw`h-95%`} >
        <View style={styles.container}>
          <View style={tw`flex-row justify-between mb-4`}>
            <View style={tw``}>
              <SorterComponent sorters={sorters} sorter={"name"} GetElements={LoadEmployees}/>
            </View>
            <View style={tw`items-end`}>
              <SearchComponent GetElements={FindEmployees} GetOriginalElements={LoadEmployees}/>
            </View>
          </View>
          <ModalChangeLabor
            isModalOpenChangeLabor={isModalOpenChangeLabor}
            setIsModalOpenChangeLabor={setIsModalOpenChangeLabor}
          />
          <ModalDelete
            isModalOpenDelete={isModalOpenDelete}
            setIsModalOpenDelete={setIsModalOpenDelete}
            DeleteFunction={DeleteEmployee}
          />  
          {employees.length > 0 ? (
            employees.map((employee, index) => {
              return (
                <AccordionEmployees name={employee.name + " " + employee.lastName} text={"correo"} value={employee.email} hei={250} key={index} >
                  <View style={[tw`w-full`]}>
                    <FieldsItems tittle={"Cargo:"} value={employee.nameSubRole} onPress={()=>{global.idEmployee = employee.idUser, setSelectedUserRole(employee.idSubRole), setIsModalOpenChangeLabor(!isModalOpenChangeLabor)}} color={"rgba(234, 179, 8, 1)"} text={"Editar"} icon={<Feather name="edit-3" size={18} color="white" />} />
                    <FieldsItems tittle={"Cultivos asignados:"} onPress={()=>{console.log("hdhd")}} color={"rgba(34, 158, 197, 1)"} text={"Editar"} icon={<EvilIcons name="search" size={25} color="white" />} />
                    <FieldsItems tittle={"Opciones:"} onPress={()=>{global.idToDelete = employee.idUser, setIsModalOpenDelete(!isModalOpenDelete)}} color={"rgba(239, 68, 68, 1)"} text={"Eliminar"} icon={<AntDesign name="delete" size={18} color="white" />} />
                  </View>
                </AccordionEmployees>
              );
            })
          ) : (
            <View style={styles.container}>
              <Text style={tw`text-center text-gray-500`}>
                No se encontraron resultados
              </Text>
            </View>
          )}
        </View>
        <Pagination maxPage={maxPage} sorters={sorters} GetElements={LoadEmployees}/>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Employee;

