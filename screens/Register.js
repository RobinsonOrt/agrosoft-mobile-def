import {REACT_APP_API_URL} from '@env'
import global from "../global";
import React, { useState, useRef, useEffect, useContext } from "react";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { useBackHandler } from "@react-native-community/hooks";
import { Link, useNavigate } from "react-router-native";
import { useForm } from "react-hook-form";
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  StyleSheet, 
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import InputForm from "../components/InputForm";
import ButtonForm from "../components/ButtonForm";
import PhoneInput from 'react-native-phone-number-input';
import Background from "../assets/background.png";
import Logo from "../assets/logo.png";

export default function Register({navigation}) {
  let navigate = useNavigate();
 
  const [phoneNumber, setPhoneNumber] = useState(null)
  const phoneInput = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLanguagee, setSelectedLanguagee] = useState(null);
  const [identifiers, setIdentifiers] = useState([]);
  const [resultt, setResult] = useState();
  const [isChecked, setChecked] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [errorr, setErrorr] = useState(false);
 
  const loadIdentifiers = async () => {
    const urlIdentifiers = REACT_APP_API_URL + "/api/identifiers";
    await axios.get(urlIdentifiers).then(response => {
      setIdentifiers(response.data);
    })
  }

  useEffect(() => {
    loadIdentifiers()
    if (resultt?.data.error === true) {
      setErrorr(true);
      setTimeout(() => {
        setErrorr(false);
      }, 5000);
    }

    if (resultt?.data.error === false) {
      navigate("/tokenValidation");
    }
  }, [resultt]);

  
  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/register";
    navigate("/notConected");
  }

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm();
 
  const valuePassword1 = watch("password1")
  const password = watch("password")
  
  useEffect(() => {
    if(isSubmitted){
    if(errors.password === undefined){
    if(valuePassword1 !== password){
      setError('password1', { type: 'pattern', message: 'password distintas'})
      console.log(errors.phoneNumber)
    }else{
      clearErrors('password1')
    }}else{
      clearErrors('password1')
    }}
  }, [valuePassword1, password]);

  useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
    console.log(phoneNumber)
    if(isSubmitted){
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
  },[phoneNumber, selectedLanguagee, errors]);

  useEffect(() => {
    const country = phoneInput.current?.getCallingCode()
    
    identifiers.map((identifier)=>{
      if(identifier.identifier == country){
        const identifierCountry = identifier.idIdentifier
        console.log(identifierCountry)
        setSelectedLanguage(identifierCountry)
      }
    }) 
  },[selectedLanguagee]);  
  
console.log(selectedLanguage)

  const onSubmit = async (data) =>{
    if(selectedLanguage !== null){
      console.log("indicador: "+selectedLanguage)
    data.phoneNumber = phoneNumber
    data.idIdentifier = selectedLanguage
    await axios
      .post(REACT_APP_API_URL + "/api/register", data)
      .then((res) => setResult(res));
  }}

  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`flex justify-center`}>
      <View style={tw`h-full w-full flex items-center justify-center px-42 pt-10`}>
        
        
    <View style={[tw`w-80 flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
      <Text style={tw`text-25px font-bold text-white mb-4`}>
        CREAR CUENTA
      </Text>
      <ScrollView style={tw`w-full`}>
        {errorr ? (
          <Text
            style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
          >
            {resultt.data.response}
          </Text>
        ) : null}
        <View style={tw` py-8 rounded-xl`}>
          
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
            defaultCode="CO"
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
          {errors.phoneNumber?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.phoneNumber?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              El numero de telefono no es valido para tu pais
            </Text>
          ) : null}

          <InputForm
            control={control}
            name="email"
            placeholder="Correo"
            autoCapitalize="none"
            keyboardType="email-address"
            minLength={5}
            maxLength={60}
            height={40}
            pattern={
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
          />
          {errors.email?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.email?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              El correo debe tener minimo 5 caracteres!
            </Text>
          ) : errors.email?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Correo invalido!
            </Text>
          ) : null}

          <InputForm
            control={control}
            name="password"
            placeholder="Contraseña"
            minLength={8}
            maxLength={24}
            height={40}
            secureTextEntry={!isChecked}
            pattern={
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
            }
          />
          
          {errors.password?.type === "required" ? (
            <Text style={tw`text-red-600 mb-10 text-center`}>Campo requerido!</Text>
          ) : errors.password?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              La contraseña debe tener minimo 8 caracteres!
            </Text>
          ) : errors.password?.type === "pattern" ? (
            <Text style={tw`text-red-600  text-center`}>
              La contraseña debe tener al menos una mayuscula, un simbolo y un
              número
            </Text>
          ) : null}
          <View style={tw`flex flex-row justify-center items-center mb-10`}>
            <Checkbox style={tw`rounded-xl`} value={isChecked} onValueChange={setChecked} />
            <Text style={tw`text-base text-white ml-3`}>
              Mostrar contraseña
            </Text>
          </View>
          <InputForm
            control={control}
            name="password1"
            placeholder="Confirmar contraseña"
            maxLength={24}
            height={40}
            secureTextEntry={!isChecked1}
          />
          
          {errors.password1?.type === "required" ? (
            <Text style={tw`text-red-600 mb-10 text-center`}>Campo requerido!</Text>
          ) :  errors.password1?.type === "pattern" ?(
            <Text style={tw`text-red-600 mb-10 text-center`}>Las contraseñas no coinciden!</Text>
          ) : null}
          <View style={tw`flex flex-row justify-center items-center mb-10`}>
            <Checkbox style={tw`rounded-xl`} value={isChecked1} onValueChange={setChecked1} />
            <Text style={tw`text-base text-white ml-3`}>
              Mostrar contraseña
            </Text>
          </View>


          <ButtonForm onPress={handleSubmit(onSubmit)} title="Registrarse" color={"rgba(32, 84, 0, 1)"}/>
          <ButtonForm onPress={() => {toggleOpenHome(); reset(); setError(false);setChecked(false);setChecked1(false)}} title="Regresar" color={"rgba(88, 155, 47, 1)"}/>
            
      
        </View>
      </ScrollView>
    </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {     
    backgroundColor: "rgba(14, 24, 7, 1)"      
  },
});