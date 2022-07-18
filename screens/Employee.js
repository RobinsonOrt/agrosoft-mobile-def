import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import tw from "twrnc";
import ModalAddLabor from "../components/ModalAddLabor";
import ModalFarmDelete from "../components/ModalFarmDelete";
import Home from "./Home";
import { Accordion } from "../components/Accordion";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import Edit from "../assets/edit.png";
import { styles } from "./Farms";
import { useBackHandler } from "@react-native-community/hooks";
import ModalEmployeeDelete from "../components/ModalEmployeeDelete";
import MyEmployeesContext from "../context/EmployeeContext";
import ModalChangeLabor from "../components/ModalChangeLabor";

const Employee = ({ navigation }) => {
  const [isModalOpenAddLabor, setIsModalOpenAddLabor] = useState(false);
  const [isModalOpenChangeLabor, setIsModalOpenChangeLabor] = useState(false);
  const [isModalOpenEmployeeDelete, setIsModalOpenEmployeeDelete] =
    useState(false);

  const { LoadEmployees, employees } = useContext(MyEmployeesContext);

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    LoadEmployees("name", "asc", 0);
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <ModalChangeLabor
              isModalOpenChangeLabor={isModalOpenChangeLabor}
              setIsModalOpenChangeLabor={setIsModalOpenChangeLabor}
            />
            <ModalAddLabor
              isModalOpenAddLabor={isModalOpenAddLabor}
              setIsModalOpenAddLabor={setIsModalOpenAddLabor}
            />
            <ModalEmployeeDelete
              isModalOpenEmployeeDelete={isModalOpenEmployeeDelete}
              setIsModalOpenEmployeeDelete={setIsModalOpenEmployeeDelete}
            />
            {employees.length > 0 ? (
              employees.map((employee, index) => {
                return (
                  <Accordion title={employee.name} key={index}>
                    <View
                      style={tw`bg-gray-300 w-full p-4 pt-3 mt-1 rounded-xl`}
                    >
                      <TextInput
                        style={tw`bg-gray-200 px-5 py-2 rounded-lg w-full h-60px`}
                        value={employee.lastName}
                        editable={false}
                      />
                      <TextInput
                        style={tw`bg-gray-200 px-5 py-2 rounded-lg w-full h-60px mt-3`}
                        value={employee.idUser}
                        editable={false}
                      />
                      <TextInput
                        style={tw`bg-gray-200 px-5 py-2 rounded-lg w-full h-60px mt-3`}
                        value={employee.nameSubRole}
                        editable={false}
                      />
                      <TouchableOpacity
                        style={tw`bg-yellow-400 justify-between items-center flex-row h-52px p-4 mt-3 mb-2 rounded-xl`}
                        onPress={() => {
                          global.idEmployee = employee.idUser;
                          setIsModalOpenChangeLabor(!isModalOpenChangeLabor);
                        }}
                      >
                        <Text style={tw`text-white text-center grow font-bold`}>
                          Editar Cargo
                        </Text>
                        <Image
                          source={Edit}
                          style={tw`h-24px w-24px float-right`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tw`bg-yellow-500 justify-between items-center flex-row w-full h-52px p-4 mt-3 rounded-xl`}
                      >
                        <Text style={tw`text-white text-center grow font-bold`}>
                          Ver Cultivos Asignados
                        </Text>
                        <Image
                          source={Enter}
                          style={tw`h-24px w-24px float-right`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tw`bg-red-500 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`}
                        onPress={() => {
                          global.idEmployee = employee.idUser;
                          setIsModalOpenEmployeeDelete(
                            !isModalOpenEmployeeDelete
                          );
                        }}
                      >
                        <Text style={tw`text-white text-center grow font-bold`}>
                          Eliminar Empleado
                        </Text>
                        <Image
                          source={Leave}
                          style={tw`h-24px w-24px float-right`}
                        />
                      </TouchableOpacity>
                    </View>
                  </Accordion>
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
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};
export default Employee;
