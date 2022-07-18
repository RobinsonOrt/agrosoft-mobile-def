import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import LogoUp from "../assets/up.png";
import LogoDown from "../assets/down.png";
import React, { useState } from "react";
import tw from "twrnc";
import CartButtonCrop from "./CartButtonCrop";
import { MaterialIcons } from '@expo/vector-icons';

export const Accordion = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(value => !value);
  }

  return (
    <>
      <View style={tw`h-60px items-center flex-row justify-between px-3`}>
        <Text style={tw`grow mr-2 uppercase text-16px`}>{name}</Text>
        <CartButtonCrop text={"Actividades"} onPress={toggleOpen} color={"rgba(156, 163, 175, 1)"} icon={isOpen ? <MaterialIcons name="keyboard-arrow-down" size={20} color="black" /> : <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />} />
      </View>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {options}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 10,


  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: '5%',
    marginTop: '5px',

  },
  sectionDescription: {
    fontSize: 20,
    fontFamily: 'Roboto',
    height: 30,
    marginLeft: '5%',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
});