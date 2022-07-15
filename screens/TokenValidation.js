import global from "../global";
import {REACT_APP_API_URL} from '@env'
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import tw from 'twrnc'
import NetInfo from '@react-native-community/netinfo';
import { useBackHandler } from "@react-native-community/hooks";

export default function TokenValidation() {

  let navigate = useNavigate()

  useBackHandler(() => {
    navigate("/");
    return true;
  });

  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/tokenValidation";
    navigate("/notConected");
  }


  const [token, onChangeToken] = useState("");
  const [error, setError] = useState("");

  

  const submit = async () => {
    if(token == null || token == ""){
      setError("El token es obligatorio");
    }else{
      setError("");
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const url = REACT_APP_API_URL + "/activate/" + token
      axios.get(url, { headers: headers })
      .then(response => {
        if(response.data == "Cuenta activada exitosamente!"){
          setError("");
          navigate("/accountActivated");
        }else{
          setError(response.data);
        }
      })
    }
    
  }
  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <Text style={tw`text-3xl font-bold text-black mb-20`}>
        Token de verificación
      </Text>
      <View style={tw`bg-yellow-600 p-5 rounded-xl`}>
        <Text style={tw`text-lg text-black leading-tight`}>
          Se ha enviado un token de verificación a su correo.
          {"\n"}{"\n"}A continuación ingreselo para validar su cuenta
        </Text>
        <TextInput
          placeholder="Token de activacion"
          onChangeText={onChangeToken}
          value={token}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
        />
        {error?<Text style={tw`text-red-900 text-xs`}>{error}</Text>:null}
        <TouchableOpacity style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}><Text style={tw`text-white text-center font-bold`} onPress={submit} >Verificar</Text></TouchableOpacity>
      </View>
    </View>
  );
}