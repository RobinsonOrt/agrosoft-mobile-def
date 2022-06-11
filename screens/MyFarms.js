import global from "../global";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import React, { useState, useEffect, useContext } from "react";
import { View,  Text, Image, TouchableOpacity, BackHandler } from "react-native";
import { Link,useNavigate } from "react-router-native";
import tw from "twrnc";
import ModalAddFarm from "../components/ModalAddFarm";
import ModalFarmDelete from "../components/ModalFarmDelete";
import Home from "./Home";
import { Accordion } from "../components/Accordion";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Info from "../assets/info.png";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import Edit from "../assets/edit.png";
import { styles } from "./Farms";
import ModalModifyFarmerInformation from "../components/ModalModifyFarmerInformation";
import MyFarmsContext from "../context/FarmContext";
import { useBackHandler } from "@react-native-community/hooks";


const MyFarms = ({ navigation }) => {
  const [isModalOpenAddFarm, setIsModalOpenAddFarm] = useState(false);
  const [isModalOpenFarmDelete, setIsModalOpenFarmDelete] = useState(false);
  const [
    isModalOpenModifyFarmerInformation,
    setIsModalOpenModifyFarmerInformation,
  ] = useState(false);

  const { farms, LoadFarms, setFarm} = useContext(MyFarmsContext);
  

  useBackHandler(() => {
    BackHandler.exitApp();
    return false;
  })

  useEffect( async () => {
    await LoadFarms("name_farm", "asc", 0);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setIsModalOpenAddFarm(!isModalOpenAddFarm)}
            style={tw`bg-green-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 mt-7 text-center`}
          >
            <Text style={tw`text-lg text-white text-center`}>
              Agregar finca
            </Text>
          </TouchableOpacity>
          <ModalAddFarm
            isModalOpenAddFarm={isModalOpenAddFarm}
            setIsModalOpenAddFarm={setIsModalOpenAddFarm}
          />
          <ModalFarmDelete
            isModalOpenFarmDelete={isModalOpenFarmDelete}
            setIsModalOpenFarmDelete={setIsModalOpenFarmDelete}
          />
          <ModalModifyFarmerInformation
            isModalOpenModifyFarmerInformation={
              isModalOpenModifyFarmerInformation
            }
            setIsModalOpenModifyFarmerInformation={
              setIsModalOpenModifyFarmerInformation
            }
          />
          {farms.length > 0 ? (
          farms.map((farm, index) => {
            return (
              <Accordion title={farm.nameFarm} key={index}>
                <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  <TouchableOpacity
                    style={tw`bg-blue-500 justify-between items-center flex-row w-full h-52px p-4 mt-3 rounded-xl`}
                  >
                    <Text style={tw`text-white text-center grow font-bold`}>
                      Ver
                    </Text>
                    <Image
                      source={Info}
                      style={tw`h-24px w-24px float-right`}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-green-500 justify-between items-center flex-row w-full h-52px p-4 mt-3 rounded-xl`}
                    onPress={() => {global.idFarm = farm.idFarm; navigation.navigate("EnterFarm")}}
                  >
                    <Text style={tw`text-white text-center grow font-bold`}>
                      Ingresar
                    </Text>
                    <Image
                      source={Enter}
                      style={tw`h-24px w-24px float-right`}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-yellow-400 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`}
                    onPress={() => {
                      setFarm(farm);
                      setIsModalOpenModifyFarmerInformation(
                        !isModalOpenModifyFarmerInformation
                      );
                      
                    }}
                  >
                    <Text style={tw`text-white text-center grow font-bold`}>
                      Editar
                    </Text>
                    <Image
                      source={Edit}
                      style={tw`h-24px w-24px float-right`}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-red-500 justify-between items-center flex-row h-52px p-4 mt-3 rounded-xl`}
                    onPress={() => {
                      global.idFarm = farm.idFarm;
                      setIsModalOpenFarmDelete(!isModalOpenFarmDelete);
                    }}
                  >
                    <Text style={tw`text-white text-center grow font-bold`}>
                      Eliminar
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
          ) : (<View style={styles.container}>
            <Text style={tw`text-center text-gray-500`}>No se encontraron resultados</Text>
          </View>)}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyFarms;
