import global from "../global";
import { REACT_APP_API_URL } from '@env'
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import tw from 'twrnc'
import Background from "../assets/background.png";
import ButtonForm from "../components/ButtonForm";
import { useBackHandler } from "@react-native-community/hooks";

export default function TokenValidation({ navigation }) {

  const [token, onChangeToken] = useState("");
  const [error, setError] = useState("");



  const submit = async () => {
    if (token == null || token == "") {
      setError("El token es obligatorio");
    } else {
      setError("");
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const url = REACT_APP_API_URL + "/activate/" + token
      axios.get(url, { headers: headers })
        .then(response => {
          if (response.data == "Cuenta activada exitosamente!") {
            setError("");
            navigation.navigate("TokenVerificated");
          } else {
            setError(response.data);
          }
        })
    }

  }
  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`h-full items-center justify-center`}>
      <View style={[tw`w-85% flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
        <Text style={tw`text-25px font-bold text-white mb-4`}>
          Verificar Cuenta
        </Text>
        <Text style={tw`text-lg text-white leading-tight`}>
          Se ha enviado un token de verificación a su correo.
          {"\n"}{"\n"}Ingreselo a continuacion para validar su cuenta
        </Text>
        <TextInput
          placeholder="Token de activacion"
          onChangeText={onChangeToken}
          value={token}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-93% my-5`}
        />
        {error ? <Text style={tw`text-red-900 text-xl`}>{error}</Text> : null}
        
        <ButtonForm onPress={()=>submit()} title="Verificar" color={"rgba(32, 84, 0, 1)"} />
        <ButtonForm onPress={()=>navigation.navigate("Login")} title="Iniciar Sesion" color={"rgba(88, 155, 47, 1)"} />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "rgba(14, 24, 7, 1)"
  },
});