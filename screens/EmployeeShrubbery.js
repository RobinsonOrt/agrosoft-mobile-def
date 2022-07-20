import React, { useContext, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../components/SubHeader";
import tw from "twrnc";
import axios from "axios";
import useSWR from "swr";
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigate } from "react-router-native";
import MyFarmsContext from "../context/FarmContext";
import { REACT_APP_API_URL } from "@env";
import ModalInfoEmployeeCrop from "../components/ModalInfoEmployeeCrop";
import global from "../global";
import enter from "../assets/Enter.png";
import actividades from "../assets/Actividades.png";
import RNPickerSelect from "react-native-picker-select";
import { EvilIcons } from "@expo/vector-icons";


export default function EmployeeShrubbery({ navigation }) {
  const { setModalVisible, idCrop } = useContext(MyFarmsContext);
  let navigate = useNavigate();

  const [search, setSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [employeeShrubberyOrder, setEmployeeShrubberyOrder] = useState([
    "created_date",
    "asc",
  ]);

  const [shrubberyId, setShrubberyId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const { data: employeeShrubbery } = useSWR(
    `${REACT_APP_API_URL}/api/coffeebush/${idCrop}/${employeeShrubberyOrder[0]}/${employeeShrubberyOrder[1]}/${pageIndex}`,
    fetcher
  );

  const { data: searchEmployeeShrubbery } = useSWR(
    search &&
      `${REACT_APP_API_URL}/api/findcoffeebushs/${idCrop}/${searchWord}/${pageIndex}`,
    fetcher
  );

  const noData =
    employeeShrubbery?.maxPage == null ||
    employeeShrubbery?.maxPage == pageIndex;
  const pageLength = employeeShrubbery?.maxPage + 1;

  useBackHandler(() => {
    navigation.goBack();
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`mt-0 pt-0 flex`}>
        <SubHeader title={"Arbustos"} />
        <ScrollView contentContainerStyle={tw`py-5 pb-40 px-5`}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View style={tw` flex-1`}>
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
            <View style={tw`flex flex-col items-end flex-1`}>

              <View style={tw`w-140px rounded-md`}>
                <RNPickerSelect
                  placeholder={{ label: "Ordenar por:", value: "" }}
                  onValueChange={(itemValue) => {
                    const itemsObj = Object.values(itemValue);
                    setEmployeeShrubberyOrder([
                      (employeeShrubberyOrder[0] = itemsObj[0]),
                      (employeeShrubberyOrder[1] = itemsObj[1]),
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
                    { label: "Recientes", value: ["created_date", "asc"] },
                    { label: "Antiguos", value: ["created_date", "desc"] },
                  ]}
                />
              </View>
              {/*<TouchableOpacity style={tw`p-2 bg-green-500 mt-1 rounded-md`}>
                <Text style={tw`text-white`}>Descargar códigos de barras</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {!search ? (
            employeeShrubbery?.response?.length > 0 ? (
              employeeShrubbery?.response?.map((item, index) => (
                <View key={index} style={tw`bg-[#205400]/10 rounded-md my-6`}>
                  <View
                    style={tw`p-5 flex items-center border-b border-[#205400]/10`}
                  >
                    <Text style={tw`font-bold text-lg`}>{item.qrCode}</Text>
                  </View>
                  <View>
                    <Text style={tw`text-center mt-5`}>
                      {item.idCoffeeBush}
                    </Text>
                    <Text style={tw`text-center mt-5`}>
                      {new Date(item.createdDdate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row justify-between p-5`}>
                    <TouchableOpacity
                      style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg flex flex-row items-center justify-around`}
                      onPress={() => {
                        setModalVisible(true);
                        setShrubberyId(item.idCoffeeBush);
                      }}
                    >
                      <Text style={tw`text-white`}>Ingresar</Text>
                      <Image style={tw`w-4 h-4`} source={enter} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`bg-green-600 p-2 flex-1 ml-2 rounded-lg flex flex-row items-center justify-around`}
                      onPress={() => {
                        navigate(`/bushactivitys/${global.idFarm}`);
                        global.idCrop = item.idCoffeeBush;
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
          ) : searchEmployeeShrubbery?.response?.length > 0 ? (
            searchEmployeeShrubbery?.response?.map((item, index) => (
              <View key={index} style={tw`bg-[#205400]/10 rounded-md my-6`}>
                <View
                  style={tw`p-5 flex items-center border-b border-[#205400]/10`}
                >
                  <Text style={tw`font-bold text-lg`}>{item.qrCode}</Text>
                </View>
                <View>
                  <Text style={tw`text-center mt-5`}>{item.idCoffeeBush}</Text>
                  <Text style={tw`text-center mt-5`}>
                    {new Date(item.createdDdate).toLocaleDateString()}
                  </Text>
                </View>
                <View style={tw`flex flex-row justify-between p-5`}>
                  <TouchableOpacity
                    style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg flex flex-row items-center justify-around`}
                    onPress={() => {
                      setModalVisible(true);
                      setShrubberyId(item.idCoffeeBush);
                    }}
                  >
                    <Text style={tw`text-white`}>Ingresar</Text>
                    <Image style={tw`w-4 h-4`} source={enter} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-green-600 p-2 flex-1 ml-2 rounded-lg flex flex-row items-center justify-around`}
                    onPress={() => {
                      navigation.navigate(`BushActivitys`);
                      global.idCrop = item.idCoffeeBush;
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
        <ModalInfoEmployeeCrop
          modalBody={
            <>
              <View>
                <Text style={tw`text-center font-bold text-lg mb-5`}>
                  ARBUSTO
                </Text>
                <Text style={tw`text-start font-bold text-md mb-5`}>
                  ID: {shrubberyId}
                </Text>
                <Text style={tw`mb-5 text-jusitfy`}>
                  Registro de revision de plagas y enfermedades
                </Text>
                <TouchableOpacity style={tw`p-5 bg-cyan-400 rounded-lg mb-5`}>
                  <Text style={tw`text-white text-center`}>Revisiones</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
