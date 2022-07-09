import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal
} from "react-native";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";

import NetInfo from '@react-native-community/netinfo';
import MyFarmsContext from "../context/FarmContext";
import CountryContext from '../context/CoutryContext';

export default function ModalModifyFarmerInformation({ isModalOpenModifyFarmerInformation, setIsModalOpenModifyFarmerInformation }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { farm, LoadFarms, UpdateFarm, error, message } = useContext(MyFarmsContext);
  const { country, loadCountries } = useContext(CountryContext);
  const [localError, setLocalError] = useState(false);
  const [localErrorMsg, setLocalErrorMsg] = useState("");


  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const saveFarm = () => {

    //validate if all fields are filled
    if (farm.nameFarm == null || farm.nameFarm == "" || farm.nameFarm.trim().length < 1 || farm.nameFarm.length > 20) {
      setLocalError(true);
      setLocalErrorMsg("El nombre de la granja debe tener entre 1 y 20 caracteres");
    }else if (farm.descriptionFarm == null || farm.descriptionFarm == "" || farm.descriptionFarm.trim().length <15 || farm.descriptionFarm.length > 150){
      setLocalError(true);
      setLocalErrorMsg("La descripción de la granja debe tener entre 15 y 150 caracteres");
    }else{
      setLocalError(false);
      setLocalErrorMsg("");
      UpdateFarm(farm);
      setIsModalOpenModifyFarmerInformation(false);
    }
  }


  useEffect(() => {
    loadCountries();
  }, []);


  return (
          <ModalModel isModalOpen={isModalOpenModifyFarmerInformation} setIsModalOpen={setIsModalOpenModifyFarmerInformation}>
              <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
                Modificar finca
              </Text>
              <ScrollView style={tw` mt-2 w-full `}>
                <View style={tw`px-7 mb-10 flex w-full items-center justify-center`}>
                  <Text style={tw` text-black mb-3 w-full  text-center`}>
                    Rellena los campos con la información correspondiente
                  </Text>
                  {error ? (
                    <Text
                      style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                    >
                      {message}
                    </Text>
                  ) : null}

                  {localError ? (
                    <Text
                      style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                    >
                      {localErrorMsg}
                    </Text>
                  ) : null}


                  <TextInput
                    onChange={(e) => farm.nameFarm = e.nativeEvent.text}
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-full mb-5 border-b border-yellow-700`}
                    defaultValue={farm.nameFarm}
                    placeholder={"Nombre de la granja"}
                  />

                  <TextInput
                    onChange={(e) => farm.descriptionFarm = e.nativeEvent.text}
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg h-83px w-full mb-5 border-b border-yellow-700`}
                    defaultValue={farm.descriptionFarm}
                    placeholder={"Descripcion de la granja"}
                    multiline={true}
                  />

                  <Picker
                    style={tw`bg-slate-50 text-base px-5 py-3 rounded-lg w-full mb-5 pl-0 pr-0 border-b border-yellow-700`}
                    itemStyle={{ backgroundColor: "yellow", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                    selectedValue={farm.idCountry}
                    enabled={false}
                    onValueChange={(itemValue) =>
                      farm.idCountry = itemValue
                    }>

                    {
                      Array.isArray(country) ?

                        country.map((item, index) => {

                          return <Picker.Item label={item.nameCountry} value={item.idCountry} key={index} />

                        }) : <Picker.Item label="" value="" key="" />
                    }
                  </Picker>

                   <ModalButton text={"Guardar"} onPress={saveFarm} color={"#22C55E"}/>
                   <ModalButton onPress={() => { LoadFarms("name_farm", "asc", "0"); setIsModalOpenModifyFarmerInformation(!setIsModalOpenModifyFarmerInformation) }}
                                text="Cancelar"
                                color="rgba(220, 38, 38, 0.86)"/>
                </View>
              </ScrollView>
        </ModalModel>
  )
}