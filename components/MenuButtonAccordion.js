import React, { useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
} from "react-native";

import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";


export const Accordion = ({ title, children, status }) => {
  const [isOpen, setIsOpen] = useState(status);
  console.log(status)



  const toggleOpen = () => {
    if(status){
        setIsOpen(status);
    }else{
        setIsOpen(value => !value);
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  return (
    <>
      <TouchableOpacity onPress={toggleOpen} style={isOpen || status ? tw`bg-gray-300 flex-row content-between items-center h-60px` : tw`bg-white-100 flex-row content-between items-center h-60px`} activeOpacity={0.6}>
      <Text style = {tw`pl-3`}>{title}</Text>

      </TouchableOpacity>

      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
      height: "60px",
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