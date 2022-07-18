import React, { useState, useContext } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import tw from "twrnc";



import { TouchableOpacity } from "react-native-gesture-handler";
import SubHeader from "./SubHeader";


export const TableActivitiesMyFarms = ({ title1, title2, subHeaderTable, children, children1, setActivityType }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenn, setIsOpenn] = useState(false);
  
    const toggleOpen = () => {
      if(isOpen == false){
          setIsOpen(true) 
          setIsOpenn(false)
          setActivityType("1")
      }
    
      //setIsOpen(value => !value);
      
    }
    const toggleOpenn = ()=>{
      if(isOpenn == false){
          setIsOpenn(true)
          setIsOpen(false)
          setActivityType("2")
      }
        
      //setIsOpenn(value => !value);
    }
  
    return (
      <>
      <View style={[tw`w-full max-h-74.5% items-center rounded-lg pb-2`,{backgroundColor:"rgba(88, 155, 47, 0.1)"}]}>
        <View style={tw`w-full h-45px flex-row items-center rounded-t-lg`}>
        <View style={tw`w-1/2 `}>      
        <TouchableOpacity style={!isOpen ? [tw`h-45px p-3 rounded-tl-lg w-full`, styles.colorButtonDisabled] : [tw`h-45px p-3 rounded-tl-lg w-full`, styles.colorButtonEnable]} onPress={toggleOpen}  activeOpacity={0.6}>
          <Text style={isOpen ? tw`text-center uppercase font-bold` : tw`text-center uppercase`}>{title1}</Text>
        </TouchableOpacity>
        </View>
        <View style={tw`w-1/2`}> 
        <TouchableOpacity style={!isOpenn ? [tw`h-45px p-3 rounded-tr-lg w-full`, styles.colorButtonDisabled] : [tw`h-45px p-3 rounded-tr-lg w-full`, styles.colorButtonEnable]} onPress={toggleOpenn}  activeOpacity={0.6}>
        <Text style={isOpenn ? tw`text-center uppercase font-bold` : tw`text-center uppercase` }>{title2}</Text>
        </TouchableOpacity>
        </View>
        </View>
        {subHeaderTable}
        <View style={[styles.list, !isOpen  ? styles.hidden : undefined]}>
          {children}
        </View>
        <View style={[styles.list, !isOpenn ? styles.hidden : undefined]}>
          {children}
        </View> 
        </View>
        
          
      </>
    );
  };

  const styles = StyleSheet.create({
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden',
      width: "100%"
    },
    colorButtonEnable: {
        backgroundColor: "rgba(32, 84, 0, 0.2)",
    },
    colorButtonDisabled:{
        backgroundColor: "rgba(32, 84, 0, 0.05)"
    }
  });