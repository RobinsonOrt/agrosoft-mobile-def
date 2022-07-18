import React from "react";
import tw from "twrnc";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CartButton = ({ text, onPress, color, image }) => {
  const styles = StyleSheet.create({
    colorButton: {
      backgroundColor: color,
    },
  });

  return (
    <View style={tw`flex-1`}>
      <TouchableOpacity
        style={[
          tw`flex flex-row justify-center items-center p-2 rounded-full`,
          styles.colorButton,
        ]}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <Text style={tw`text-center text-white mr-2`}>{text}</Text>
        <Image source={image} style={tw`w-4 h-4 object-cover`} />
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;
