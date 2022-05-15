import global from "../global";
import React, { useContext, useState } from "react";
import axios from "axios";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-native";
import NetInfo from '@react-native-community/netinfo';


export default function TokenValidationTwo() {

  let navigate = useNavigate()

  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/tokenValidationPassword";
    navigate("/notConected");
  }


  const { result } = useContext(AuthContext);
  const [error, setError] = useState(false)

  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.userToken === result.data.userToken) {
      global.tokenChange = data.userToken;
      navigate("/passwordRecoveryForm")
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000);
    }
  };

  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
        Token de verificación
      </Text>
      <ScrollView style={tw`mt-10`}>
        <View style={tw`bg-yellow-900 p-5 rounded-xl`}>
          <Text style={tw`text-lg text-white`}>
            Se ha enviado un token de verificación a su correo para el cambio de
            contraseña, por favor ingreselo a continuación
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5 w-full`}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Token"
                autoCapitalize="none"
              />
            )}
            name="userToken"
          />
          {errors.userToken?.type === "required" ? (
            <Text style={tw`text-red-600 mb-5 text-center`}>Campo requerido!</Text>
          ) : null}
          {
            error ? <Text style={tw`text-white bg-red-500 p-5 rounded-lg font-bold text-center`}>El token no coincide con el esperado!</Text> : null
          }
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}
          >
            <Text style={tw`text-white text-center font-bold`}>Verificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
