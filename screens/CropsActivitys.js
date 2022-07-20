import global from "../global";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CleanButton from "../components/CleanButton";
import PickerSorter from "../components/PickerSorter";
import SearchByName from "../components/SearchByName";
import SubHeader from "../components/SubHeader";
import tw from "twrnc";
import axios from "axios";
import useSWR from "swr";
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigate, useParams } from "react-router-native";
import { REACT_APP_API_URL } from "@env";

export default function CropsActivitys({navigation}) {
  const { idFarm } = global.idFarm;

  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [orderCropActivitys, setOrderCropActivitys] = useState([
    "name_activity",
    "asc",
  ]);
  const [pageIndex, setPageIndex] = useState(0);

  const { data: cropActivitys } = useSWR(
    `${REACT_APP_API_URL}/api/activitiesbyemployee/${global.idFarm}/${global.idUser}/${2}/${
      orderCropActivitys[0]
    }/${orderCropActivitys[1]}/${pageIndex}`,
    fetcher
  );

  const noData =
    cropActivitys?.maxPage == null || cropActivitys?.maxPage == pageIndex;
  const pageLength = cropActivitys?.maxPage + 1;

  useBackHandler(() => {
    navigation.goBack();
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`mt-0 pt-0 flex`}>
        <SubHeader title={"Actividades"} />
        <ScrollView contentContainerStyle={tw`py-5 pb-40 px-5`}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View style={tw` flex-1`}>
              <SearchByName
              //data={farms} key="nameFarm" setData={setFilter}
              />
              <CleanButton />
            </View>
            <View style={tw`flex flex-col items-end flex-1`}>
              <PickerSorter
              //list={data}
              //key1="nameFarm"
              //key2="createdDate"
              //newList={setFilter}
              />
              {/* <TouchableOpacity
                style={tw`p-2 bg-green-500 mt-1 rounded-md`}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={tw`text-white`}>Agregar actividad</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {cropActivitys?.response?.length > 0 ? (
            cropActivitys?.response?.map((item, index) => (
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
                    style={tw`bg-green-400 p-2 flex-1 mr-2 rounded-lg`}
                    onPress={() => {
                      global.idActivity = item.idActivity;
                      navigation.navigate(`CropsRecords`);
                    }}
                    // onPress={() => {
                    //   setModalVisible(true);
                    //   setShrubberyId(item.idCoffeeBush);
                    // }}
                  >
                    <Text style={tw`text-white text-center`}>Ingresar</Text>
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
