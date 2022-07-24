import global from "../global";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, ImageBackground, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import tw from "twrnc";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import Background from "../assets/background.png";
import ButtonForm from "../components/ButtonForm";
import PasswordRecovery from "./PasswordRecovery";


export default function TokenValidationTwo({ navigation }) {
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
      navigation.navigate("PasswordRecoveryForm")
    } else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000);
    }
  };

  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`h-full items-center justify-center`}>
      <View style={[tw`w-85% flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
        <Text style={tw`text-25px font-bold text-white mb-4`}>
          Verificacion del Token
        </Text>
        <Text style={tw`text-lg text-white`}>
          Se ha enviado un token de verificación a su correo para el cambio de
          contraseña, por favor ingreselo a continuación.
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-slate-50 px-5 py-3 rounded-lg w-93% my-5`}
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
        <ButtonForm onPress={handleSubmit(onSubmit)} title="CONFIRMAR" color={"rgba(32, 84, 0, 1)"} />
        <ButtonForm onPress={()=>navigation.navigate("Login")} title="CANCELAR" color={"rgba(239, 68, 68, 1)"} />
        
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "rgba(14, 24, 7, 1)"
  },
});