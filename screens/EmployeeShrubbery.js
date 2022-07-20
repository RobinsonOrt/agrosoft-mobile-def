import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-native";
import MyFarmsContext from "../context/FarmContext";
import { Link } from "react-router-native";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import ModalInfoEmployeeCrop from "../components/ModalInfoEmployeeCrop";
import global from "../global";
import enter from "../assets/Enter.png";
import actividades from "../assets/Actividades.png";

export default function EmployeeShrubbery() {
  const { idFarm, setModalVisible, modalVisible, setIdCrop, idCrop } =
    useContext(MyFarmsContext);
  let navigate = useNavigate();

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

  const noData =
    employeeShrubbery?.maxPage == null ||
    employeeShrubbery?.maxPage == pageIndex;
  const pageLength = employeeShrubbery?.maxPage + 1;
  
  useBackHandler(() => {
    console.log("back");
    navigate("/employeecrops");
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`mt-0 pt-0 flex`}>
        <SubHeader title={"Arbustos"} />
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
              <TouchableOpacity style={tw`p-2 bg-green-500 mt-1 rounded-md`}>
                <Text style={tw`text-white`}>Descargar códigos de barras</Text>
              </TouchableOpacity>
            </View>
          </View>
          {employeeShrubbery?.response?.length > 0 ? (
            employeeShrubbery?.response?.map((item, index) => (
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
