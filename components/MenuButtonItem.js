import React from "react";
import tw from "twrnc";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MenuButtonItem = ({ text, onPress, status }) => {
  return (
    <TouchableOpacity
      style={
        status
          ? tw`w-full h-35px items-center pt-1.5`
          : tw`w-full h-35px items-center pt-1.5`
      }
      onPress={onPress}
    >
      <Text style={tw`text-white text-center grow uppercase text-16px`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuButtonItem;
