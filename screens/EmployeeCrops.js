import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import global from "../global";
import { useNavigate, Link } from "react-router-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CleanButton from "../components/CleanButton";
import PickerSorter from "../components/PickerSorter";
import SearchByName from "../components/SearchByName";
import SubHeader from "../components/SubHeader";
import MyFarmsContext from "../context/FarmContext";
import tw from "twrnc";
import { useBackHandler } from "@react-native-community/hooks";
import useSWR from "swr";
import axios from "axios";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import ModalInfoEmployeeCrop from "../components/ModalInfoEmployeeCrop";

export default function EmployeeCrops() {
  const { idFarm, setModalVisible, modalVisible, setIdCrop } =
    useContext(MyFarmsContext);
  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [employeeCropsOrder, setEmployeeCropsOrder] = useState([
    "name_crop",
    "asc",
  ]);

  const { data: employeeCrops } = useSWR(
    `${REACT_APP_API_URL}/api/getcropusers/${idFarm}/${global.idUser}/${
      employeeCropsOrder[0]
    }/${employeeCropsOrder[1]}/${0}`,
    fetcher
  );

  useBackHandler(() => {
    console.log("back");
    navigate("/");
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Cultivos"} />
        <ScrollView style={tw`py-5 px-5`}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View>
              <SearchByName
              //data={farms} key="nameFarm" setData={setFilter}
              />
              <CleanButton />
            </View>
            <PickerSorter
            //list={data}
            //key1="nameFarm"
            //key2="createdDate"
            //newList={setFilter}
            />
          </View>
          {employeeCrops?.response.length > 0 ? (
            employeeCrops?.response?.map((item, index) => (
              <View key={index} style={tw`bg-[#205400]/10 rounded-md`}>
                <View
                  style={tw`p-5 flex items-center border-b border-[#205400]/10`}
                >
                  <Text style={tw`font-bold text-lg`}>{item.nameCrop}</Text>
                </View>
                <View style={tw`flex flex-row justify-between p-5`}>
                  <Link
                    style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg`}
                    to="/employeeshrubbery"
                    onPress={() => {
                      setIdCrop(item.idCrop);
                    }}
                  >
                    <Text style={tw`text-white`}>Ingresar</Text>
                  </Link>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={tw`bg-blue-500 p-2 flex-1 rounded-lg`}
                  >
                    <Text style={tw`text-white`}>Consultar</Text>
                  </TouchableOpacity>
                  <ModalInfoEmployeeCrop
                    modalBody={
                      <>
                        <View style={tw`mb-5 w-full`}>
                          <Text style={tw`text-lg font-bold mb-1`}>
                            Nombre del cultivo
                          </Text>
                          <Text style={tw`bg-gray-100 p-2 rounded`}>
                            {item.nameCrop}
                          </Text>
                        </View>
                        <View style={tw`mb-5 w-full`}>
                          <Text style={tw`text-lg font-bold mb-1`}>
                            Descripcion del cultivo
                          </Text>
                          <Text style={tw`bg-gray-100 p-2 rounded`}>
                            {item.descriptionCrop}
                          </Text>
                        </View>
                        <View style={tw`mb-5 w-full`}>
                          <Text style={tw`text-lg font-bold mb-1`}>
                            Variedad del cafe
                          </Text>
                          <Text style={tw`bg-gray-100 p-2 rounded`}>
                            {item.coffeeVariety}
                          </Text>
                        </View>
                        <View style={tw`mb-5 w-full`}>
                          <Text style={tw`text-lg font-bold mb-1`}>
                            Antiguedad del cultivo
                          </Text>
                          <Text style={tw`bg-gray-100 p-2 rounded`}>
                            {item.ageCrop}
                          </Text>
                        </View>
                      </>
                    }
                  />
                  <TouchableOpacity
                    style={tw`bg-green-600 p-2 flex-1 ml-2 rounded-lg`}
                  >
                    <Text style={tw`text-white`}>Actividades</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={tw`text-center w-full`}>
              <Text>No se encontraron datos</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
});
