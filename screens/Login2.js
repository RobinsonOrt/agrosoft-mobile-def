import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { useBackHandler } from "@react-native-community/hooks";
import { Link, useNavigate } from "react-router-native";
import { useForm, Controller } from "react-hook-form";
import NetInfo from '@react-native-community/netinfo';
import AuthContext from "../context/AuthContext";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import InputForm from "../components/InputForm";

export default function Login2() {

  const {LoginUser, result} = useContext(AuthContext);

  let navigate = useNavigate();
  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/login";
    navigate("/notConected");
  }

  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(false);


  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  console.log(errors)

  useEffect(() => {
    console.log("global.idUser")
  }, []);

  const login = async (data) =>{
    const loginresponse = await LoginUser(data);
    if(!loginresponse.data.error){
      global.jwToken = loginresponse.data.response;
      global.idUser = loginresponse.data.idUser;
      navigate("/userLoged");
    }else{
      setError(true);
    }
  }

  const onSubmit = data => console.log(data);



  return (
    <View style={tw`h-full flex items-center justify-center`}>
      <Text style={tw`text-4xl font-bold text-black mb-5 mt-20`}>
        Iniciar sesión
      </Text>
      <ScrollView style={tw`mt-10`}>
        {error ? (
          <Text
            style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
          >
            {result.data.response}
          </Text>
        ) : null}
        <View style={tw`px-7 py-8 rounded-xl`}>
          <Text style={tw`text-xl text-black mb-5 font-bold`}>
            Correo electrónico
          </Text>
          <InputForm
            control={control}
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70`}
            name="email"
            placeholder="example@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
            pattern={
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
          />
          {errors.email?.type === "required" ? (
            <Text style={tw`text-red-600 mb-5 text-center`}>Campo requerido!</Text>
          ) : errors.email?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-5 text-center`}>
              Correo invalido!
            </Text>
          ) : null}
          <Text style={tw`text-xl text-black my-5 font-bold`}>Contraseña</Text>
          <InputForm
            control={control}
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5`}
            name="password"
            placeholder="Contraseña"
            secureTextEntry={!isChecked}
          />
          
          {errors.password?.type === "required" ? (
            <Text style={tw`text-red-600 mb-10 text-center`}>Campo requerido!</Text>
          ) : null}
          <View style={tw`flex flex-row justify-center items-center mb-10`}>
            <Checkbox value={isChecked} onValueChange={setChecked} />
            <Text style={tw`text-base text-black ml-3`}>
              Mostrar contraseña
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-yellow-600 p-3 rounded-lg`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-lg text-white text-center`}>Ingresar</Text>
          </TouchableOpacity >
          <Link to={'/passwordRecovery'}>
            <Text style={tw`text-base text-black mt-7 text-center underline`}>
              Olvidé mi contraseña
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
