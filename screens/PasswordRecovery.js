import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import NetInfo from '@react-native-community/netinfo';

export default function PasswordRecovery( {navigation}) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/passwordRecovery";
    navigate("/notConected");
  }

  const [error, setError] = useState(false);

  const {RecoveryPassword, result} = useContext(AuthContext)

  useBackHandler(() => {
    navigate("/login");
    return true;
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (result?.data.error === true) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }

    if (result?.data.error === false) {
      navigate("/tokenValidationPassword");
    }
  }, [result]);

  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
        Recuperar contraseña
      </Text>
      <ScrollView style={tw`mt-10`}>
        <View style={tw`bg-yellow-900 p-5 rounded-xl`}>
          <Text style={tw`text-lg text-white leading-tight`}>
            Ingrese el correo de la cuenta a recuperar
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
                style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
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
          {/* <TextInput
            placeholder="Correo electrónico"
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
          /> */}
          <TouchableOpacity
            onPress={handleSubmit(RecoveryPassword)}
            style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}
          >
            <Text style={tw`text-white text-center font-bold`}>Recuperar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
