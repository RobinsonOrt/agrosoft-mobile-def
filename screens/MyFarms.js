import global from "../global";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import React, { useState, useEffect, useContext } from "react";
import { View,  Text, Image, TouchableOpacity, BackHandler, ScrollView } from "react-native";
import { Link,useNavigate } from "react-router-native";
import tw from "twrnc";
import ModalAddFarm from "../components/ModalAddFarm";
import ModalFarmDelete from "../components/ModalFarmDelete";
import Home from "./Home";
import { Accordion } from "../components/Accordion";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Enter from "../assets/Enter.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png"
import { styles } from "./Farms";
import ModalModifyFarmerInformation from "../components/ModalModifyFarmerInformation";
import MyFarmsContext from "../context/FarmContext";
import { useBackHandler } from "@react-native-community/hooks";
import { Cart } from "../components/Cart";
import CartButton from "../components/CartButton";



const MyFarms = ({ navigation }) => {
  const [isModalOpenAddFarm, setIsModalOpenAddFarm] = useState(false);
  const [isModalOpenFarmDelete, setIsModalOpenFarmDelete] = useState(false);
  const [isModalOpenModifyFarmerInformation, setIsModalOpenModifyFarmerInformation ] = useState(false);
  

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
          <ScrollView>
          {farms.length > 0 ? (
          farms.map((farm, index) => {
            return (
              
              <Cart name={farm.nameFarm} description={farm.descriptionFarm} id={farm.idFarm} key={index}>
                  <CartButton text={"Ingresar"} onPress={() => {global.idFarm = farm.idFarm; navigation.navigate("EnterFarm")}} color={"#22C55E"} image={Enter}/>
                  <CartButton text={"Editar"} onPress={() => {
                      setFarm(farm);
                      setIsModalOpenModifyFarmerInformation(
                        !isModalOpenModifyFarmerInformation
                      );   
                    }} color={"#F8BD23"} image={Edit}/>
                  <CartButton text={"Eliminar"} onPress={() => {
                      global.idFarm = farm.idFarm;
                      setIsModalOpenFarmDelete(!isModalOpenFarmDelete);}}
                      color={"#EF4444"} image={Delete}/>
                </Cart>
              
            );
          })
          ) : (<View style={styles.container}>
            <Text style={tw`text-center text-gray-500`}>No se encontraron resultados</Text>
          </View>)}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyFarms;
