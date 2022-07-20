import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
import enter from "../assets/Enter.png";
import actividades from "../assets/Actividades.png";

export default function EmployeeCrops() {
  const { idFarm, setModalVisible, modalVisible, setIdCrop } =
    useContext(MyFarmsContext);

  const [pageIndex, setPageIndex] = useState(0);

  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [employeeCropsOrder, setEmployeeCropsOrder] = useState([
    "name_crop",
    "asc",
  ]);

  const { data: employeeCrops } = useSWR(
    `${REACT_APP_API_URL}/api/getcropusers/${idFarm}/${global.idUser}/${employeeCropsOrder[0]}/${employeeCropsOrder[1]}/${pageIndex}`,
    fetcher
  );

  const noData =
    employeeCrops?.maxPage == null || employeeCrops?.maxPage == pageIndex;
  const pageLength = employeeCrops?.maxPage + 1;

  useBackHandler(() => {
    console.log("back");
    navigate("/");
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Cultivos"} />
        <ScrollView contentContainerStyle={tw`py-5 pb-40 px-5`}>
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
              <View key={index} style={tw`bg-[#205400]/10 rounded-md mb-5`}>
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
                      global.idFarm = item.idFarm;
                    }}
                  >
                    <View
                      style={tw`flex flex-row items-center w-full justify-between`}
                    >
                      <Text style={tw`text-white`}>Ingresar</Text>
                      <Image style={tw`w-4 h-4`} source={enter} />
                    </View>
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
                    style={tw`bg-green-600 p-2 flex-1 ml-2 rounded-lg flex flex-row items-center`}
                    onPress={() => {
                      navigate(`/cropsactivitys/${item.idFarm}`);
                      global.idCrop = item.idCrop;
                      global.idFarm = item.idFarm;
                    }}
                  >
                    <Text style={tw`text-white`}>Actividades</Text>
                    <Image source={actividades} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={tw`text-center w-full`}>
              <Text>No se encontraron datos</Text>
            </View>
          )}
          <View style={tw`flex flex-row items-center justify-center mt-5`}>
            <TouchableOpacity
              style={tw`bg-green-500 p-2 rounded-md mr-3 ${
                pageIndex <= 0 ? "hidden" : ""
              }`}
              onPress={() => {
                setPageIndex(pageIndex - 1);
              }}
            >
              <Text style={tw`text-white text-lg`}>Volver</Text>
            </TouchableOpacity>
            {Array.from({ length: pageLength }).map((_, i) => (
              <TouchableOpacity
                key={i}
                style={tw`bg-gray-300 w-10 h-10 flex items-center justify-center ${
                  i == pageIndex ? "bg-gray-400" : ""
                }`}
                onPress={() => setPageIndex(i)}
              >
                <Text style={tw`text-lg font-normal`}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={tw`bg-green-500 p-2 rounded-md ml-3 ${noData ? "hidden" : ""}`}
              onPress={() => {
                setPageIndex(pageIndex + 1);
              }}
            >
              <Text style={tw`text-white text-lg`}>Siguiente</Text>
            </TouchableOpacity>
          </View>
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
