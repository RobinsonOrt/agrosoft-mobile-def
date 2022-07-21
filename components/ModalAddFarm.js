import { REACT_APP_API_URL } from '@env'
import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal, 
  StyleSheet, 
  Picker,
  Image,
} from "react-native";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton"
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import MyFarmsContext from "../context/FarmContext";
import CountryProvider from '../context/CoutryContext';
import RNPickerSelect from "react-native-picker-select";
import dropDownOpen from '../assets/dropDownOpen.png';
import InputForm from './InputForm';
import PickerModel from "./PickerModel";
//import {Picker} from '@react-native-picker/picker';

export default function ModalAddFarm({ isModalOpenAddFarm, setIsModalOpenAddFarm }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const [result, setResult] = useState();
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const { message, error, setError, setMessage, AddFarm } = useContext(MyFarmsContext);
  const {country, loadCountries} = useContext(CountryProvider);

  const [localError, setLocalError] = useState({ "error": false, "message": "" });
 
  

  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAddFarm = (data) => {
    if (selectedCountry == null || selectedCountry == "") {
      setLocalError({ "error": true, "message": "No ha seleccionado el pais" })
      return} 
      else {
        data.idCountry = selectedCountry
      }
    const response = AddFarm(data);
    console.log(response);
    if(!response.error){
      setIsModalOpenAddFarm(false);
      reset();
      setSelectedCountry(null)
      setLocalError({ "error": false, "message": "" });
    }
  };

  useEffect(() => {

    loadCountries();
    if (result?.data.error === false) {
      //navigate("/tokenValidation");
    }
  }, []);


  return (
    
    <ModalModel isModalOpen={isModalOpenAddFarm} setIsModalOpen={setIsModalOpenAddFarm}>
              <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
                Agregar nueva finca
              </Text>
<<<<<<< HEAD
              <ScrollView style={tw`mt-2 w-full h-120 pb-3`}>
                <View style={tw`w-full px-7`}>
=======
              <ScrollView style={tw`mt-2 w-full  h-130 pb-3`}>
                <View style={tw`w-full items-center`}>
>>>>>>> cultivosRobinson
                  <Text style={tw` text-black mb-10 w-full  text-center`}>
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
                      setSelected={setSelectedCountry} />
                    {localError.error ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        {localError.message}
                      </Text>
                    ) : null}


                  <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitAddFarm)} color={"#22C55E"}/>
                  <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenAddFarm(!setIsModalOpenAddFarm), setError(false), reset()}} color={"rgba(220, 38, 38, 0.86)"}/>
                </View>
              </ScrollView>
        </ModalModel>


  )
} 

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
    width: 321,// to ensure the text is never behind the icon
    marginBottom: 20
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#78D43F',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30,
    width: 321,
    marginBottom: 20
   // to ensure the text is never behind the icon
  },
  inputWeb:{
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#78D43F',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30,
    marginBottom: 20
  }
});
