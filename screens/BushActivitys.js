import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
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
import enter from "../assets/Enter.png";
import actividades from "../assets/Actividades.png";

export default function BushActivitys() {
  const { idFarm } = useParams();

  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [orderBushActivitys, setOrderBushActivitys] = useState([
    "name_activity",
    "asc",
  ]);

  const { data: bushActivitys } = useSWR(
    `${REACT_APP_API_URL}/api/getactivities/${1}/${idFarm}/${
      orderBushActivitys[0]
    }/${orderBushActivitys[1]}/${0}`,
    fetcher
  );

  console.log(
    `${REACT_APP_API_URL}/api/getactivities/${1}/${idFarm}/${
      orderBushActivitys[0]
    }/${orderBushActivitys[1]}/${0}`
  );

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
          {bushActivitys?.response?.length > 0 ? (
            bushActivitys?.response?.map((item, index) => (
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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
