import { REACT_APP_API_URL } from '@env'
import global from "../global";
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
import ModalButton from "./ModalButton"
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import MyFarmsContext from "../context/FarmContext";
import CountryProvider from '../context/CoutryContext';
export default function ModalAddFarm({ isModalOpenAddFarm, setIsModalOpenAddFarm }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const [result, setResult] = useState();
  const [localError, setLocalError] = useState({
    msg: "",
    status: false
  });

  const [selectedCountry, setSelectedCountry] = useState();
  
  const { message, error, setError, setMessage, AddFarm } = useContext(MyFarmsContext);
  const {country, loadCountries} = useContext(CountryProvider);
  

  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Input = ({
    style,
    fieldValue,
    placeholder,
    keyboardType,
    secureTextEntry,
    pattern,
    autoCapitalize,
    minLength,
    maxLength,
    multiline,
  }) => {
    return (
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: pattern,
          minLength: minLength,
          maxLength: maxLength,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
          />
        )}
        name={fieldValue}
      />
    );
  };

  const onSubmitAddFarm = (data) => {
    
    if(data.nameFarm.trim().length > 150 || data.descriptionFarm.trim().length < 15 || data.descriptionFarm.trim().length > 150 || data.descriptionFarm.trim().length < 15){
      setLocalError({
        msg: "Los campos no pueden quedar vacios o con solo espacios",
        status: true
      });
      return;
    }
    data.idCountry = selectedCountry;
    const response = AddFarm(data);
    console.log(response);
    if(!response.error){
      setIsModalOpenAddFarm(false);
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
              <ScrollView style={tw`mt-2 w-full pb-3`}>
                <View style={tw`w-full px-7 mb-10 flex items-center justify-center`}>
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
                  <Input
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                    fieldValue="nameFarm"
                    placeholder="Nombre"
                    autoCapitalize="words"
                    
                  />
                  {errors.nameFarm && (
                    <Text style={tw`text-red-600 mb-5`}>Campo requerido, maximo 50 caracteres!</Text>
                  )}
                  <Input
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg h-83px w-321px mb-5 border-b border-yellow-700`}
                    fieldValue="descriptionFarm"
                    placeholder="Descripción"
                    autoCapitalize="words"
                    multiline={true}
                  />

                
                  {errors.descriptionFarm && (
                    <Text style={tw`text-red-600 mb-5 w-65`}>Campo requerido , minimo 15 caracteres y maximo 50 caracteres</Text>
                  )}

                  <Picker
                    style={tw`bg-slate-50 text-base px-5 py-3 rounded-lg w-80 mb-5 pl-0 pr-0 border-b border-yellow-700`}
                    itemStyle={{ backgroundColor: "yellow", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                    selectedValue={selectedCountry}
                    onValueChange={(itemValue) =>
                      setSelectedCountry(itemValue)
                    }>

                    {
                      Array.isArray(country)?

                      country.map((item, index) => {

                        return <Picker.Item label={item.nameCountry} value={item.idCountry} key={index} />

                      }) : <Picker.Item label="" value="" key="" />
                    }
                  </Picker>

                  <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitAddFarm)} color={"#22C55E"}/>
                  <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenAddFarm(!setIsModalOpenAddFarm), setError(false)}} color={"rgba(220, 38, 38, 0.86)"}/>
                </View>
              </ScrollView>
        </ModalModel>
  )
} 
