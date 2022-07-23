import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import Background from "../assets/background.png";
import ButtonForm from "../components/ButtonForm";

export default function PasswordRecovery({ navigation }) {
  let navigate = useNavigate();

  const [error, setError] = useState(false);

  const { RecoveryPassword, result } = useContext(AuthContext)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (result?.data.error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }

    if (result?.data.error === false) {
      navigation.navigate("TokenValidationTwo");
    }
  }, [result]);

  return (
    <>
      <ImageBackground source={Background} resizeMode="cover" style={tw`h-full items-center justify-center`}>
        <View style={[tw`w-85% flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
          <Text style={tw`text-25px font-bold text-white mb-4`}>
            Recuperar contraseña
          </Text>
          <Text style={tw`text-lg text-white leading-tight`}>
            Ingrese el correo de su cuenta
          </Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={tw`bg-slate-50 px-5 py-3 w-93% rounded-lg my-5`}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email?.type === "required" ? (
              <Text style={tw`text-red-600 mb-5 text-center`}>Campo requerido!</Text>
            ) : errors.email?.type === "pattern" ? (
              <Text style={tw`text-red-600 mb-5 text-center`}>Correo invalido!</Text>
            ) : null}
            {error ? (
              <Text
                style={tw`text-white bg-red-500 p-5 rounded-lg font-bold text-center`}
              >
                {result.data.response}
              </Text>
            ) : null}
            <ButtonForm onPress={handleSubmit(RecoveryPassword)} title="ENVIAR CORREO" color={"rgba(32, 84, 0, 1)"} />
            <ButtonForm onPress={()=>navigation.navigate("Login")} title="CANCELAR" color={"rgba(239, 68, 68, 1)"} />
        </View>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "rgba(14, 24, 7, 1)"
  },
});