import React, { useState } from "react";
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
import { useNavigate, useParams } from "react-router-native";
import { REACT_APP_API_URL } from "@env";
import enter from "../assets/Enter.png";
import RNPickerSelect from "react-native-picker-select";
import { EvilIcons } from "@expo/vector-icons";

export default function BushActivitys() {
  const { idFarm } = useParams();

  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [search, setSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [orderBushActivitys, setOrderBushActivitys] = useState([
    "name_activity",
    "asc",
  ]);

  const [pageIndex, setPageIndex] = useState(0);
  const { data: bushActivitys } = useSWR(
    `${REACT_APP_API_URL}/api/getactivities/${1}/${idFarm}/${
      orderBushActivitys[0]
    }/${orderBushActivitys[1]}/${pageIndex}`,
    fetcher
  );

  const { data: searchBushActivitys } = useSWR(
    search &&
      `${REACT_APP_API_URL}/api/findactivities/${1}/${idFarm}/${searchWord}/${pageIndex}`,
    fetcher
  );

  const noData =
    bushActivitys?.maxPage == null || bushActivitys?.maxPage == pageIndex;
  const pageLength = bushActivitys?.maxPage + 1;

  useBackHandler(() => {
    console.log("back");
    navigate("/");
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`mt-0 pt-0 flex`}>
        <SubHeader title={"Actividades"} />
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
                  setOrderBushActivitys([
                    (orderBushActivitys[0] = itemsObj[0]),
                    (orderBushActivitys[1] = itemsObj[1]),
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
                  { label: "A-Z", value: ["name_activity", "asc"] },
                  { label: "Z-A", value: ["name_activity", "desc"] },
                  { label: "Recientes", value: ["created_date", "asc"] },
                  { label: "Antiguos", value: ["created_date", "desc"] },
                ]}
              />
            </View>
          </View>
          {!search ? (
            bushActivitys?.response?.length > 0 ? (
              bushActivitys?.response?.map((item, index) => (
                <View key={index} style={tw`bg-[#205400]/10 rounded-md my-6`}>
                  <View
                    style={tw`p-5 flex items-center border-b border-[#205400]/10`}
                  >
                    <Text style={tw`font-bold text-lg`}>
                      {item.nameActivity}
                    </Text>
                  </View>
                  <View>
                    <Text style={tw`text-center mt-5`}>
                      {item.descriptionActivity}
                    </Text>
                  </View>
                  <View style={tw`flex flex-row justify-between p-5`}>
                    <TouchableOpacity
                      style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg flex flex-row items-center justify-evenly`}
                      onPress={() => {
                        navigate(`/cropsrecords/${item.idActivity}`);
                      }}
                      // onPress={() => {
                      //   setModalVisible(true);
                      //   setShrubberyId(item.idCoffeeBush);
                      // }}
                    >
                      <Text style={tw`text-white text-center`}>Ingresar</Text>
                      <Image style={tw`w-4 h-4`} source={enter} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={tw`text-center w-full`}>
                <Text>No se encontraron datos</Text>
              </View>
            )
          ) : searchBushActivitys?.response?.length > 0 ? (
            searchBushActivitys?.response?.map((item, index) => (
              <View key={index} style={tw`bg-[#205400]/10 rounded-md my-6`}>
                <View
                  style={tw`p-5 flex items-center border-b border-[#205400]/10`}
                >
                  <Text style={tw`font-bold text-lg`}>{item.nameActivity}</Text>
                </View>
                <View>
                  <Text style={tw`text-center mt-5`}>
                    {item.descriptionActivity}
                  </Text>
                </View>
                <View style={tw`flex flex-row justify-between p-5`}>
                  <TouchableOpacity
                    style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg flex flex-row items-center justify-evenly`}
                    onPress={() => {
                      navigate(`/cropsrecords/${item.idActivity}`);
                    }}
                    // onPress={() => {
                    //   setModalVisible(true);
                    //   setShrubberyId(item.idCoffeeBush);
                    // }}
                  >
                    <Text style={tw`text-white text-center`}>Ingresar</Text>
                    <Image style={tw`w-4 h-4`} source={enter} />
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
