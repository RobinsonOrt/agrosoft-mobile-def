import axios from "axios";
import {REACT_APP_API_URL} from '@env'
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import global from "../global";
import NetInfo from "@react-native-community/netinfo";


export default function PasswordRecoveryForm() {
  let navigate = useNavigate();
  
  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });

  const redirectConnection = () => {
    global.urlConnected = "/passwordRecoveryForm";
    navigate("/notConected");
  }

  const [password1, onChangePassword1] = useState("");
  const [password2, onChangePassword2] = useState("");
  const [errorPass1, setErrorPass1] = useState();
  const [errorPass2, setErrorPass2] = useState();
  const [error, setError] = useState();

  const onSubmit = async () => {
    console.log(password1);
    console.log(password2);
    var passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/;
    if (!passwordPattern.test(password1)) {
      setErrorPass1("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
    }else{
      setErrorPass1("");
      if (!passwordPattern.test(password2)) {
        setErrorPass2("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
      }else{
        setErrorPass2("");
        if(password1 !== password2){
          setError("Las contraseñas no coinciden");
        }else{
          setError("");
          var dataO = new Object();
          dataO.password1 = password1;
          dataO.password2 = password2;
          dataO.tokenUser = global.tokenChange;
          global.tokenChange = "";
          var data1 = JSON.stringify(dataO);
          console.log("dsd");
          const url = REACT_APP_API_URL + "/api/changepassword"
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
          }
          await axios.post(url, data1, { headers: headers })
          .then(response => {
            if(response.data.error){
              setError(response.data.error);
            }else{
              setError("");
              navigate("/login");
            }
          })
        }
      }
    }
  }
  
  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <Text style={tw`text-3xl font-bold text-black mb-20`}>
        Cambio de contraseña
      </Text>
      <View style={tw`bg-yellow-900 p-5 rounded-xl`}>
        <Text style={tw`text-lg text-white`}>
          Nueva contraseña
        </Text>
        <TextInput
          id="password1"
          placeholder="Nueva contraseña"
          onChangeText={onChangePassword1}
          value={password1}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
          pattern={
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
          }
          secureTextEntry={true}
        />
        {errorPass1?<Text style={tw`text-red-500 text-xs`}>{errorPass1}</Text>:null}
        <Text style={tw`text-lg text-white`}>
          Vuelve a escribir la contraseña
        </Text>
        <TextInput
          id="password2"
          placeholder="Repetir contraseña"
          onChangeText={onChangePassword2}
          value={password2}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
          secureTextEntry={true}
          pattern={
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
          }
        />
        {errorPass2?<Text style={tw`text-red-500 text-xs`}>{errorPass2}</Text>:null}
        {error?<Text style={tw`text-red-500 text-xs`}>{error}</Text>:null}
        <TouchableOpacity
            style={tw`bg-yellow-700 px-5 py-2 rounded-lg mt-6 w-full`}
            onPress={onSubmit}
          >
            <Text style={tw`text-lg text-white text-center`}>Guardar</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
