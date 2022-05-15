import React from "react";
import { View, Text, TextInput } from "react-native-web";
import { Link } from "react-router-native";
import tw from "twrnc";

export default function TokenCard({titulo, info, button, placeholder}) {
  return (
    <View style={tw`h-full flex items-center justify-center px-5`}>
      <View style={tw`bg-yellow-900 p-5 rounded-xl`}>
        <Text style={tw`text-lg text-white leading-tight`}>
          {info}
        </Text>
        <TextInput
          placeholder={placeholder}
          style={tw`bg-slate-50 px-5 py-3 rounded-lg w-70 my-5`}
        />
        <Link
          to="/tokenValidationPassword"
          style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}
        >
          <Text style={tw`text-white text-center font-bold`}>{button}</Text>
        </Link>
      </View>
    </View>
  );
}
