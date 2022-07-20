import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import global from "../global";
import { useNavigate, Link } from "react-router-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { EvilIcons } from "@expo/vector-icons";
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

  const [search, setSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");

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

  const { data: searchEmployeeCrops } = useSWR(
    search &&
      searchWord.length > 0 &&
      `${REACT_APP_API_URL}/api/findcropusers/${idFarm}/${global.idUser}/${searchWord}/${pageIndex}`,
    fetcher
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Cultivos"} />
        <ScrollView contentContainerStyle={tw`py-5 pb-40 px-5`}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View>
              <TextInput
                onChangeText={setSearchWord}
                value={searchWord}
                placeholder="Buscar por nombre..."
                style={tw`bg-white flex-row border border-green-500 items-center h-30px w-180px rounded-md px-2`}
              />
              <View style={tw`flex flex-row items-center justify-between`}>
                <TouchableOpacity
                  style={tw`bg-green-400 py-1 px-3 mt-1 rounded-md`}
                  onPress={(e) => {
                    e.preventDefault();
                    if (searchWord.length > 0) {
                      setSearch(true);
                    }
                  }}
                >
                  <Text style={tw`text-white`}>Buscar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-green-500 py-1 px-3 mt-1 rounded-md`}
                  onPress={() => {
                    setSearch(false);
                    setSearchWord("");
                  }}
                >
                  <Text style={tw`text-white`}>Limpiar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`w-140px rounded-md`}>
              <RNPickerSelect
                placeholder={{ label: "Ordenar por:", value: "" }}
                onValueChange={(itemValue) => {
                  const itemsObj = Object.values(itemValue);
                  setEmployeeCropsOrder([
                    (employeeCropsOrder[0] = itemsObj[0]),
                    (employeeCropsOrder[1] = itemsObj[1]),
                  ]);
                }}
                style={customPickerStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return (
                    <View style={tw`mt-1`}>
                      <EvilIcons name="chevron-down" size={27} color="gray" />
                    </View>
                  );
                }}
                items={[
                  { label: "A-Z", value: ["name_crop", "asc"] },
                  { label: "Z-A", value: ["name_crop", "desc"] },
                  { label: "Recientes", value: ["created_date", "asc"] },
                  { label: "Antiguos", value: ["created_date", "desc"] },
                ]}
              />
            </View>
          </View>
          {!search ? (
            employeeCrops?.response.length !== undefined ? (
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
            )
          ) : search && searchEmployeeCrops?.response.length > 0 ? (
            searchEmployeeCrops?.response?.map((item, index) => (
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
              style={tw`bg-green-500 p-2 rounded-md ml-3 ${
                noData ? "hidden" : ""
              }`}
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

export const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    borderRadius: 7,
    color: "rgba(156, 163, 175, 1)",
    backgroundColor: "white",
    paddingRight: 30,
    width: 140,
    height: 30,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    borderRadius: 7,
    color: "rgba(156, 163, 175, 1)",
    backgroundColor: "white",
    paddingRight: 30,
    width: 140,
    height: 30,

    // to ensure the text is never behind the icon
  },
  inputWeb: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    borderRadius: 9,
    color: "rgba(156, 163, 175, 1)",
    backgroundColor: "white",
    paddingRight: 30,
    width: 140,
    height: 30,
  },
});
