import {REACT_APP_API_URL} from '@env'
import global from "../global";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker
} from "react-native";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
//import PhoneInput from 'react-native-phone-number-input';



export default function Register() {
  //const [phoneNumber, setPhoneNumber] = useState('')
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/register";
    navigate("/notConected");
  }

  const [result, setResult] = useState();
  const [error, setErrorr] = useState(false);
  const [identifiers, setIdentifiers] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  //const phoneInput = useRef(null);
  // const [value, setValue] = useState();
  

 
  

  const loadIdentiiers = async () => {
    const urlIdentifiers = REACT_APP_API_URL + "/api/identifiers";
    await axios.get(urlIdentifiers).then(response => {
      setIdentifiers(response.data);
    })
  }

  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors)

  const Input = ({
    fieldValue,
    placeholder,
    keyboardType,
    secureTextEntry,
    pattern,
    autoCapitalize,
    minLength,
    maxLength,
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
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5 border-b border-yellow-700`}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
          />
        )}
        name={fieldValue}
      />
    );
  };


  /*const onSubmit = async (data) => {
    data.idIdentifier = selectedLanguage
    await axios
      .post(REACT_APP_API_URL + "/api/register", data)
      .then((res) => setResult(res));
  };*/

  const onSubmit = async (data) => {
    data.idIdentifier = selectedLanguage
    console.log(data)
  };

  useEffect(() => {
    loadIdentiiers()
    if (result?.data.error === true) {
      setErrorr(true);
      setTimeout(() => {
        setErrorr(false);
      }, 5000);
    }

    if (result?.data.error === false) {
      navigate("/tokenValidation");
    }
  }, [result]);

  return (
    <View style={tw`h-full flex items-center justify-center`}>
      <Text style={tw`text-4xl font-bold text-black mt-20 mb-5`}>
        Crear cuenta
      </Text>
      <ScrollView style={tw`mt-10`}>
        <View style={tw`px-7 mb-10 flex items-center justify-center`}>
          <Text style={tw` text-black mb-10 text-center`}>
            Rellena los campos con la información correspondiente
          </Text>
          {error ? (
            <Text
              style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
            >
              {result.data.response}
            </Text>
          ) : null}
          <Input
            fieldValue="name"
            placeholder="Nombres"
            autoCapitalize="words"
            //pattern={/^[a-zA-Z]{1,50}$/}
          />
          {errors.name && (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido, maximo 50 caracteres!</Text>
          )}
          <Input
            fieldValue="lastName"
            placeholder="Apellidos"
            autoCapitalize="words"
            //pattern={/^[a-zA-Z]{1,50}$/}
          />
          {errors.lastName && (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido , maximo 50 caracteres</Text>
          )}
          <Input
            fieldValue="phoneNumber"
            placeholder="Celular"
            keyboardType="numeric"
            minLength={10}
            maxLength={10}
            pattern={/^([0-9])*$/}
          />
          {errors.phoneNumber && (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido , debe tener 10 caracteres y solo digitos del 0 al 9</Text>
          )}
          <Picker
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5 border-b border-yellow-700`}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) =>
              setSelectedLanguage(itemValue)
            }>
            {identifiers.map((item, index) => (
              <Picker.Item label={"+" + item.identifier + " - " + item.countryName} value={item.idIdentifier} key={index} />
              ))        
            }  
          </Picker>

          
          
          
          

          {/*<PhoneInput ref={phoneInput}  defaultValue = {phoneNumber} onChangeText = {(text) => {setPhoneNumber(text)} } defaultCode='CO' containerStyle={tw`rounded-lg h-50px`} textInputStyle = {tw`bg-yellow-700 rounded-lg rounded-lg`} textContainerStyle = {tw`rounded-lg`} />/*}
          {/* <PhoneInput
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5 border-b border-yellow-700`}
            placeholder="Número telefonico"
            value={value}
            onChange={setValue}
          /> 
          <TouchableOpacity onPress={() => {const checkValid = phoneInput.current?.isValidNumber(phoneNumber); console.log(checkValid); if(!checkValid){setError('phoneNumber2', { type: 'valid', message: '' })}}}><Text>Prueba</Text></TouchableOpacity>*/}
          <Input
            fieldValue="email"
            placeholder="Correo electrónico"
            autoCapitalize="none"
            maxLength={60}
            pattern={
              /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$/
            }
          />
          {errors.email?.type === "required" ? (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido!</Text>
          ) : errors.email?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-5`}>Correo invalido</Text>
          ) : errors.email && (
            <Text style={tw`text-red-600 mb-5`}>Correo invalido, debe tener entre 4 y 60 caracteres</Text>
          )}
          <Input
            fieldValue="password"
            placeholder="Contraseña"
            minLength={8}
            pattern={
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
            }
            secureTextEntry={true}
          /> 
          {errors.password?.type === "required" ? (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido!</Text>
          ) : errors.password?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-5`}>
              La contraseña debe tener al menos una mayuscula, un simbolo y un
              número y no mas de 24 caracteres
            </Text>
          ) : errors.password?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-5 w-70 text-center`}>
              La contraseña debe tener al menos 8 caracteres
            </Text>
          ) : null}
          <TouchableOpacity
            style={tw`bg-yellow-700 px-5 py-2 rounded-lg mt-6 w-full`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-lg text-white text-center`}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
