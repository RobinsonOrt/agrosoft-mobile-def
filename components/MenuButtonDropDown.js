import React from "react";
import tw from "twrnc";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import dropDownOpen from "../assets/dropDownOpen.png";
import dropDownClosed from "../assets/dropDownClosed.png";

const MenuButtonDropDown = ({
  title,
  onPress,
  isOpen,
  status,
  image,
  styleImage,
}) => {
  const styles = StyleSheet.create({
    colorButton: {
      backgroundColor: "rgba(88, 155, 47, 0.5)",
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isOpen || status
          ? [
              tw`bg-gray-300 flex-row mx-5 px-2 content-between items-center h-30px rounded-md rounded-b-none border-b-2 border-white`,
              styles.colorButton,
            ]
          : [
              tw`bg-white-100 flex-row mx-5  px-2 content-between items-center h-30px rounded-md`,
              styles.colorButton,
            ]
      }
    >
      <View style={tw`h-16px w-23px`}>
        <Image source={image} style={styleImage} />
      </View>
      <Text style={tw`text-white text-center grow uppercase text-16px `}>
        {title}
      </Text>
      <Image
        source={isOpen || status ? dropDownOpen : dropDownClosed}
        style={isOpen || status ? tw`h-8px w-12px` : tw`h-12px w-8px`}
      />
    </TouchableOpacity>
  );
};

export default MenuButtonDropDown;
