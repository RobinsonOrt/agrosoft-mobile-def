import axios from "axios";
import { REACT_APP_API_URL } from '@env'
import React, { useState, useContext } from "react";
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import global from "../global";
import AuthContext from "../context/AuthContext";
import Background from "../assets/background.png";
import ButtonForm from "../components/ButtonForm";
import Checkbox from "expo-checkbox";


export default function PasswordRecoveryForm({ navigation }) {

  const { setResult } = useContext(AuthContext)

  const [password1, onChangePassword1] = useState("");
  const [password2, onChangePassword2] = useState("");
  const [errorPass1, setErrorPass1] = useState();
  const [errorPass2, setErrorPass2] = useState();
  const [error, setError] = useState();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const onSubmit = async () => {
    var passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/;
    if (!passwordPattern.test(password1)) {
      setErrorPass1("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
    } else {
      setErrorPass1("");
      if (!passwordPattern.test(password2)) {
        setErrorPass2("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
      } else {
        setErrorPass2("");
        if (password1 !== password2) {
          setError("Las contraseñas no coinciden");
        } else {
          setError("");
          var dataO = new Object();
          dataO.password1 = password1;
          dataO.password2 = password2;
          dataO.tokenUser = global.tokenChange;
          global.tokenChange = "";
          var data1 = JSON.stringify(dataO);
          const url = REACT_APP_API_URL + "/api/changepassword"
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege...'
          }
          await axios.post(url, data1, { headers: headers })
            .then(response => {
              if (response.data.error) {
                setError(response.data.error);
              } else {
                setError("");
                setResult(null);
                setChecked1(false);
                setChecked2(false);
                navigation.navigate("Login");
              }
            })
        }
      }
    }
  }

  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`h-full items-center justify-center`}>
      <View style={[tw`w-85% flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
        <Text style={tw`text-25px font-bold text-white mb-4`}>
          Cambio de contraseña
        </Text>
        <Text style={tw`text-lg text-white mb-5`}>
          Nueva contraseña
        </Text>
        {errorPass1 ? <Text style={tw`text-red-500 text-xs`}>{errorPass1}</Text> : null}
        <TextInput
          id="password1"
          placeholder="Nueva contraseña"
          onChangeText={onChangePassword1}
          value={password1}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-93% mb-1`}
          pattern={
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
          }
          secureTextEntry={!isChecked1}
        />
        <View style={tw`flex-row mb-5`}>
          <Checkbox style={tw`rounded-xl`} value={isChecked1} onValueChange={setChecked1} />
          <Text style={tw`text-base text-white ml-3`}>
            Mostrar contraseña
          </Text>
        </View>

        
        <Text style={tw`text-lg text-white`}>
          Vuelve a escribir la contraseña
        </Text>
        {errorPass2 ? <Text style={tw`text-red-500 text-xs mt-5`}>{errorPass2}</Text> : null}
        <TextInput
          id="password2"
          placeholder="Repetir contraseña"
          onChangeText={onChangePassword2}
          value={password2}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-93% mb-1`}
          secureTextEntry={!isChecked2}
          pattern={
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
          }
        />
        <View style={tw`flex-row mb-5`}>
          <Checkbox style={tw`rounded-xl`} value={isChecked2} onValueChange={setChecked2} />
          <Text style={tw`text-base text-white ml-3`}>
            Mostrar contraseña
          </Text>
        </View>
        
        {error ? <Text style={tw`text-red-500 text-xs`}>{error}</Text> : null}

        <ButtonForm onPress={() => onSubmit()} title="guardar cambios" color={"rgba(32, 84, 0, 1)"} />
        <ButtonForm onPress={() => {
          navigation.navigate("Login"),
          setResult(null),
          setChecked1(false),
          setChecked2(false)}}
        title="CANCELAR"
        color={"rgba(239, 68, 68, 1)"} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "rgba(14, 24, 7, 1)"
  },
});