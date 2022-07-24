import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import InputForm from "../components/InputForm";
import ButtonForm from "../components/ButtonForm";
import Background from "../assets/background.png";
import Logo from "../assets/logo.png";
import { useBackHandler } from "@react-native-community/hooks";

export default function Login({ navigation }) {
  useBackHandler(() => {
    navigation.navigate("Home");
    return true;
  });

  const { LoginUser, result } = useContext(AuthContext);

  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    const loginresponse = await LoginUser(data);
    if (!loginresponse.data.error) {
      global.jwToken = loginresponse.data.response;
      global.idUser = loginresponse.data.idUser;

      setError(false)
      setChecked(false)
    } else {
      setError(true);
    }
  }

  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`flex justify-center`}>
      <View style={tw`h-full w-full flex items-center justify-center px-42 pt-10`}>

        <Image source={Logo} style={tw`h-30px w-263px mb-10`} />
        <View style={[tw`w-85 flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
          <Text style={tw`text-25px font-bold text-white mb-4`}>
            INICIO DE SESIÓN
          </Text>
          <ScrollView style={tw`w-full`}>
            {error ? (
              <Text
                style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
              >
                {result.data.response}
              </Text>
            ) : null}
            <View style={tw` py-8 rounded-xl`}>
              <Text style={tw`text-xl text-white mb-3`}>
                Correo electrónico:
              </Text>
              <InputForm
                control={control}
                name="email"
                placeholder="example@gmail.com"
                autoCapitalize="none"
                keyboardType="email-address"
                height={40}
                pattern={
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                }
              />
              {errors.email?.type === "required" ? (
                <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
              ) : errors.email?.type === "pattern" ? (
                <Text style={tw`text-red-600 mb-2 text-center`}>
                  Correo invalido!
                </Text>
              ) : null}
              <Text style={tw`text-xl text-white my-3`}>Contraseña:</Text>
              <InputForm
                control={control}
                name="password"
                placeholder="Contraseña"
                height={40}
                secureTextEntry={!isChecked}
              />

              {errors.password?.type === "required" ? (
                <Text style={tw`text-red-600 mb-10 text-center`}>Campo requerido!</Text>
              ) : null}
              <View style={tw`flex flex-row justify-center items-center mb-10`}>
                <Checkbox style={tw`rounded-xl`} value={isChecked} onValueChange={setChecked} />
                <Text style={tw`text-base text-white ml-3`}>
                  Mostrar contraseña
                </Text>
              </View>
              <ButtonForm onPress={handleSubmit(login)} title="Iniciar Sesión" color={"rgba(32, 84, 0, 1)"} />
              <ButtonForm onPress={() => { navigation.navigate("Home"); reset(); setError(false); setChecked(false) }} title="Regresar" color={"rgba(88, 155, 47, 1)"} />

              <TouchableOpacity onPress={() => navigation.navigate("PasswordRecovery")}>
                <Text style={tw`text-base text-white mt-7 text-center underline`}>
                  Olvidé mi contraseña
                </Text>
              </TouchableOpacity>
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