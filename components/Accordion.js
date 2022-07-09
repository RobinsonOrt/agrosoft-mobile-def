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

export const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(value => !value);
    }

    return (
        <>
            <TouchableOpacity onPress={toggleOpen} style={styles.heading} activeOpacity={0.6}>
                <Text>{title}</Text>

                <Image source={isOpen ? LogoUp : LogoDown} style={tw`h-37px w-35px p-0 m-0`} />
            </TouchableOpacity>
            <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
                {children}
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