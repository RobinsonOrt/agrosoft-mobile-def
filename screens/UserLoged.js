import global from "../global";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";

export default function UserLoged() {
  console.log(global.jwToken);
  let navigate = useNavigate();

  useBackHandler(() => {
    navigate("/login");
    return false;
  });

const logOut = () => {
  global.jwToken = "";
  navigate("/");
  return false;
}

  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <View style={tw`bg-yellow-900 p-5 rounded-xl`}>
        <Text style={tw`text-lg text-white leading-tight`}>
          Logeado satisfactoriamente
        </Text>
      </View>
      <TouchableOpacity
            onPress={logOut}
            style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}
          >
            <Text style={tw`text-white text-center font-bold`}>Cerrar Sesion</Text>
          </TouchableOpacity>
    </View>
  );
}
