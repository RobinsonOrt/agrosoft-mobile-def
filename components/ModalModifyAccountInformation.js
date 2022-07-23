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

export default function ModalModifyAccountInformation({ isModalOpen, setIsModalOpen }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { user, ModifyUser, error } = useContext(MyUserContext);
  const { identifiers, actualIdentifier, setActualIdentifier, getIdentifier, setIdentifier, identifier } = useContext(MyIdentifierContext);
  const [localError, setLocalError] = useState({ status: false, message: "" });

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
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

  useEffect(() => {
    reset({
      name: user.name,
      lastName: user.lastName,
    });
    setPhoneNumber(user.phoneNumber)
  }, [user]);

  const onSubmit = async (data) => {
    const dataToSend = {}
    dataToSend.phoneNumber = user.phoneNumber
    dataToSend.name = data.name
    dataToSend.lastName = data.lastName
    dataToSend.idIdentifier = actualIdentifier
    dataToSend.idUser = global.idUser
    const userResponse = await ModifyUser(dataToSend);
    if (!userResponse.data.error) {
      setIsModalOpen(false);
      const identifierResponse = await getIdentifier(actualIdentifier)
      setIdentifier(identifierResponse.data.response);
    }
  }

  /*   useEffect(() => {
      const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
      console.log("numero: " + phoneNumber)
  
      console.log(phoneNumber)
      if (phoneNumber === undefined || phoneNumber === null || phoneNumber === "") {
        console.log("error " + phoneNumber)
        setError('phoneNumber', { type: 'required', message: '' })
      }
      else {
        clearErrors('phoneNumber')
      }
  
    }, [phoneNumber, country]);
  
    const country = phoneInput.current?.getCallingCode()
  
    useEffect(() => {
  
      identifiers.map((identifier) => {
        if (identifier.identifier == country) {
          const identifierCountry = identifier.idIdentifier
          console.log(identifierCountry)
          setSelectedLanguage(identifierCountry)
        }
      })
      console.log(selectedLanguagee)
    }, [country]); */


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

              <Picker
                style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                selectedValue={actualIdentifier}
                onValueChange={(itemValue) =>
                  setActualIdentifier(itemValue)
                }>
                {identifiers.map((item, index) => (
                  <Picker.Item label={"+" + item.identifier + " - " + item.countryName} value={item.idIdentifier} key={index} />
                ))
                }
              </Picker>
              <TextInput
                style={[tw`bg-white px-3 py-3 rounded-7px w-full mb-5 border`, {borderColor: 'rgba(120, 212, 63, 1)'}]}
                placeholder="celular"
                defaultValue={user.phoneNumber}
                onChangeText={text => user.phoneNumber = text}
                keyboardType='numeric'
              />

              <ButtonForm onPress={handleSubmit(onSubmit)} title="Guardar cambios" color={"rgba(34, 197, 94, 1)"} />
              <ButtonForm onPress={() => { setIsModalOpen(!setIsModalOpen); reset(); setError(false); }} title="Cancelar" color={"rgba(220, 38, 38, 0.86)"} />
            </View>
          </ScrollView>
        </View>
      </ModalModel>
    </>
  )
}