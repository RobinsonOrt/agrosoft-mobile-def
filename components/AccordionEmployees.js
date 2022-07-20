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
  
  export const AccordionEmployees = ({ name, text, value, hei, children }) => {


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
    
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 10,
    
    
      },
      hidden: {
        height: 0,
      },
      list: {
        overflow: 'hidden',
        height: hei,
        backgroundColor: "rgba(214,222,210,1)",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 10,
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

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
      setIsOpen(value => !value);
    }
    const stylesa = StyleSheet.create({
      colorButton: {     
        backgroundColor: "rgba(189,202,180,255)"
      },
      accordionEmployeess: {
        backgroundColor: "rgba(214,222,210,1)"
      },
      openAccordion:{
        borderBottomWidth: 1,
        borderBottomColor: "rgba(130, 130, 130, 1)",
        margin: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      },
      closeAccordion:{
        margin: 10,
        borderRadius: 16,
      }
    });
  
    return (
      <>
        <View style={[tw`h-50px items-center flex-row justify-between`, isOpen ? stylesa.openAccordion : stylesa.closeAccordion, stylesa.accordionEmployeess]}>
          <TouchableOpacity style={[tw`justify-between justify-center items-center flex-row h-50px w-15% `, isOpen ? tw`rounded-tl-2xl` : tw`rounded-bl-2xl rounded-tl-2xl`, stylesa.colorButton]} onPress={toggleOpen}  activeOpacity={0.6}>
            {isOpen ? <MaterialIcons name="keyboard-arrow-down" size={25} color="black" /> : <MaterialIcons name="keyboard-arrow-right" size={25} color="black" />}
          </TouchableOpacity>
          <Text style={tw`grow mr-2 uppercase text-center text-20px`}>{name}</Text>
        </View>
        <View style={[styles.list, !isOpen ? styles.hidden : tw`p-13px`]}>
          <Text style={tw`grow uppercase font-bold text-center text-18px`}>{text}</Text>
          <Text style={tw`grow text-center text-15px`}>{value}</Text>
          <View style={tw`flex-row justify-center px-3 py-4`}>
            {children}
          </View>
        </View>
      </>
    );
  };
  
  