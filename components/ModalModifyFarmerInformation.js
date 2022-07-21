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
import InputForm from './InputForm';
import PickerModel from "./PickerModel";
import { useForm, Controller } from "react-hook-form";

export default function ModalModifyFarmerInformation({ isModalOpenModifyFarmerInformation, setIsModalOpenModifyFarmerInformation }) {
  let navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [localError, setLocalError] = useState({ "error": false, "message": "" });

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { farm, LoadFarms, UpdateFarm, error, message } = useContext(MyFarmsContext);
  const { country, loadCountries } = useContext(CountryContext);

  const [localErrorMsg, setLocalErrorMsg] = useState("");


  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const saveFarm = async (data) => {
    if (selectedCountry == null || selectedCountry == "") {
      setLocalError({ "error": true, "message": "No ha seleccionado el pais" })
      return} 
      else {
        data.idCountry = selectedCountry
      }
    
      
    data.idFarm = global.idFarm  
    const response = UpdateFarm(data);
    console.log(response);
    if(!response.error){
      setIsModalOpenModifyFarmerInformation(false);
      reset();
      setSelectedCountry(null)
      setLocalError({ "error": false, "message": "" });
    }
  };

  useEffect(() => {
    reset({
      nameFarm: farm.nameFarm,
      descriptionFarm: farm.descriptionFarm,
    });
    setSelectedCountry(farm.idCountry)
  }, [farm]);


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
                  {localError.status ? (
                    <Text
                      style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                    >
                      {localError.msg}
                    </Text>
                  ) : null}
                
                      <InputForm
                      control={control}
                      name="nameFarm"
                      placeholder="Nombre finca"
                      autoCapitalize="words"
                      maxLength={50}
                      minLength={5}
                      autoFocus={true}
                      height={40}
                      pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
                    />
                    {errors.nameFarm?.type === "required" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.nameFarm?.type === "pattern" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        No se aceptan caracteres especiales
                      </Text>
                    ) : errors.nameFarm?.type === "minLength" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        Minimo 5 caracteres!
                      </Text>
                    ) : null}

                    
                    <InputForm
                      control={control}
                      name="descriptionFarm"
                      placeholder="Descripcion"
                      autoCapitalize="sentences"
                      height={80}
                      maxLength={100}
                      minLength={15}
                      multiline={true}
                      pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
                    />
                    {errors.descriptionFarm?.type === "required" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.descriptionFarm?.type === "pattern" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        No se permiten caracteres especiales!
                      </Text>
                    ) : errors.descriptionFarm?.type === "minLength" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        Minimo 15 caracteres!
                      </Text>
                    ) : null}

                    <PickerModel list={country}
                      label="nameCountry"
                      value="idCountry"
                      text="Pais"
                      setSelected={setSelectedCountry}
                      selected={selectedCountry} />
                    {localError.error ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        {localError.message}
                      </Text>
                    ) : null}

                   <ModalButton text={"Guardar"} onPress={handleSubmit(saveFarm)} color={"#22C55E"}/>
                   <ModalButton onPress={() => { LoadFarms("name_farm", "asc", "0"); setIsModalOpenModifyFarmerInformation(!setIsModalOpenModifyFarmerInformation) }}
                                text="Cancelar"
                                color="rgba(220, 38, 38, 0.86)"/>
                </View>
              </ScrollView>
        </ModalModel>
  )
}