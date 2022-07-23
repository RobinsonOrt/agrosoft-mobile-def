import { REACT_APP_API_URL } from '@env'
import global from "../global";
import React, { useState, useEffect, useRef, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal
} from "react-native";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";
import InputForm from "../components/InputForm";
import ButtonForm from "../components/ButtonForm";
import PhoneInput from 'react-native-phone-number-input';
import NetInfo from '@react-native-community/netinfo';
import MyUserContext from '../context/UserContext';
import MyIdentifierContext from '../context/IdentifierContext';
import ModalModel from './ModalModel'

export default function ModalModifyAccountInformation({ isModalOpen, setIsModalOpen, navigation }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { user, ModifyUser, error } = useContext(MyUserContext);
  const { identifiers, actualIdentifier, setActualCountryCode, setActualIdentifier, getIdentifier, setIdentifier, identifier } = useContext(MyIdentifierContext);
  const [localError, setLocalError] = useState({status: false, message: ""});

  const [phoneNumber, setPhoneNumber] = useState(null)
  const phoneInput = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLanguagee, setSelectedLanguagee] = useState(null);
  const [errorr, setErrorr] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm();

  useBackHandler(() => {
    navigate("/");
    return true;
  });

  useEffect(async() => {
    const identifierResponse = await getIdentifier(user.idIdentifier)
    setIdentifier(identifierResponse.data.response);
  }, []);

  useEffect(() => {
    reset({
      name: user.name,
      lastName: user.lastName,
    });
    setPhoneNumber(user.phoneNumber)
  }, [user]);

  


  const onSubmit = async (data) => {
    if(selectedLanguage !== null){
      const dataToSend = {}
      dataToSend.phoneNumber = phoneNumber
      dataToSend.name = data.name
      dataToSend.lastName = data.lastName
      dataToSend.idIdentifier = selectedLanguage
      dataToSend.idUser = global.idUser
    const userResponse = await ModifyUser(dataToSend);
    if(!userResponse.data.error){
      const identifierResponse = await getIdentifier(selectedLanguage)
      setActualCountryCode(identifierResponse.data.response.countryCode)
      setIsModalOpen(false);
      reset()
      setIdentifier(identifierResponse.data.response);
    }}
  };
  
  useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
    console.log("numero: "+phoneNumber)
    if(isSubmitted){
      console.log(phoneNumber)
      if(phoneNumber === undefined || phoneNumber === null || phoneNumber === ""){
        console.log("error "+phoneNumber)
        setError('phoneNumber', { type: 'required', message: ''})
      }else if(!checkValid){
        setError('phoneNumber', { type: 'pattern', message: ''})
      }
      else{
        clearErrors('phoneNumber')
      }
    }  
  },[phoneNumber, country, isSubmitted]);

  const country = phoneInput.current?.getCallingCode()

  useEffect(() => {

    identifiers.map((identifier)=>{
      if(identifier.identifier == country){
        const identifierCountry = identifier.idIdentifier
        console.log(identifierCountry)
        setSelectedLanguage(identifierCountry)
      }
    }) 
    console.log(selectedLanguagee)
  },[country]); 


  return (
    <>
      <ModalModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <View style={tw`flex items-center justify-center`}>
              <Text style={tw`text-3xl font-bold text-black mt-8 mb-5`}>
                Administrar perfil
              </Text>
              <ScrollView style={tw`mt-2`}>
                <View style={tw` flex items-center justify-center`}>
                  <Text style={tw` text-black mb-10 w-283px  text-center`}>
                    Rellena los campos con la información correspondiente
                  </Text>
                  {localError.status ? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{localError.message}</Text> : null}
                  {error.status ? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{error.message}</Text> : null}
                  <InputForm
                        control={control}
                        name="name"
                        placeholder="Nombres"
                        autoCapitalize="words"
                        autoFocus={true}
                        minLength={1}
                        maxLength={50}
                        height={40}
                        pattern={/^[a-zA-Z ]+$/}
                      />
                      {errors.name?.type === "required" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                      ) : errors.name?.type === "pattern" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                          El nombre no debe contener caracteres especiales
                        </Text>
                      ) : null}

                    <InputForm
                        control={control}
                        name="lastName"
                        placeholder="Apellidos"
                        autoCapitalize="words"
                        minLength={1}
                        maxLength={50}
                        height={40}
                        pattern={/^[a-zA-Z ]+$/}
                        
                      />
                      {errors.lastName?.type === "required" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                      ) : errors.lastName?.type === "pattern" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                          Los apellidos no debe contener caracteres especiales
                        </Text>
                      ) : null}


                  <PhoneInput
                      placeholder="Número telefonico"
                      ref={phoneInput}
                      defaultValue={phoneNumber}
                      value={phoneNumber}
                      defaultCode={identifier.countryCode}
                      onChangeCountry={(text) => {
                        setSelectedLanguagee(text)
                        
                      }}
                      onChangeText={(text) => {
                        setPhoneNumber(text);
                      }} 
            
                      containerStyle={[tw`h-40px w-full rounded-lg items-center mb-5 border bg-white`, {borderColor: '#205400'}]}
                      textContainerStyle={tw`bg-white px-2 py-0 rounded-lg`}
                      countryPickerButtonStyle={[tw`border-r-2 h-30px`,{borderColor: '#205400'}]}
                      codeTextStyle={tw`text-14px`}
                    />
                    {errorr.error?(<Text style={tw`text-red-600 mb-2 text-center`}>{errorr.message}</Text>): null}
                    {errors.phoneNumber?.type === "required" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.phoneNumber?.type === "pattern" ? (
                      <Text style={tw`text-red-600 mb-2 text-center`}>
                        El numero de telefono no es valido para tu pais
                      </Text>
                    ) : null}

                  <ButtonForm onPress={handleSubmit(onSubmit)} title="Guardar cambios" color={"rgba(34, 197, 94, 1)"}/>
                  <ButtonForm onPress={() => {setIsModalOpen(!setIsModalOpen); reset(); setError(false);}} title="Cancelar" color={"rgba(220, 38, 38, 0.86)"}/>  
                </View>
              </ScrollView>
            </View>
            </ModalModel>
    </>
  )
}