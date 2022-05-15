import global from "../global";
import {REACT_APP_API_URL} from '@env'
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { useBackHandler } from "@react-native-community/hooks";
import { Link, useNavigate } from "react-router-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import NetInfo from '@react-native-community/netinfo';

export default function Login() {

  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if(!state.isConnected){
      redirectConnection();
    }
  });

  const redirectConnection = () => {
    global.urlConnected = "/login";
    navigate("/notConected");
  }


  const [isChecked, setChecked] = useState(false);
  const [result, setResult] = useState();
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

  const Input = ({
    fieldValue,
    placeholder,
    keyboardType,
    secureTextEntry,
    pattern,
    autoCapitalize,
    minLength,
  }) => {
    return (
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: pattern,
          minLength: minLength,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5`}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        )}
        name={fieldValue}
      />
    );
  };

  const onSubmit = async (data) => {
    const user = {"email": data.email.toLowerCase(), "password": data.password}
    console.log(user)
    await axios
      .post(REACT_APP_API_URL + "/api/login", user)
      .then((res) => setResult(res));
  };

  useEffect(() => {
    if (
      result?.data.error === true &&
      result?.data.response === "Email o Contraseña Incorrecto"
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else if (
      result?.data.error === true &&
      result?.data.response === "Su cuenta no ha sido activada, revise su email"
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
        navigate("/tokenValidation");
      }, 5000);
    }

    if (result?.data.error === false) {
      global.jwToken = result?.data.response;
      navigate("/userLoged");
    }
  }, [result]);

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
          <Input
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70`}
            fieldValue="email"
            placeholder="Correo"
            autoCapitalize="none"
            keyboardType="email-address"
            pattern={
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            }
          />
          {errors.email?.type === "required" ? (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido!</Text>
          ) : errors.email?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-5 text-center`}>
              Correo invalido!
            </Text>
          ) : null}
          <Text style={tw`text-xl text-black my-5 font-bold`}>Contraseña</Text>
          <Input
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 mb-5`}
            fieldValue="password"
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
          </TouchableOpacity>
          <Link
            to="/passwordRecovery"
            activeOpacity={0.6}
            underlayColor="#ddddd"
          >
            <Text style={tw`text-base text-black mt-7 text-center underline`}>
              Olvidé mi contraseña
            </Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
