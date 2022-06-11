import React, { useState, useContext } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import MyRequestsOtherFarmsContext from "../context/RequestsOtherFarmsContext";


import { TouchableOpacity } from "react-native-gesture-handler";


export const RequestTable1 = ({ title, children, children1 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenn, setIsOpenn] = useState(false);

    const { LoadOtherRequests, setOtherRequests } = useContext(MyRequestsOtherFarmsContext);
  
    const toggleOpen = async () => {
      if(isOpen == false){
            setOtherRequests([]);
          setIsOpen(true) 
          setIsOpenn(false)
          LoadOtherRequests("1", 0);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    
      //setIsOpen(value => !value);
      
    }
    const toggleOpenn = async () => {
      if(isOpenn == false){
            setOtherRequests([]);
          setIsOpenn(true)
          setIsOpen(false)
          LoadOtherRequests("2", 0);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
        
      //setIsOpenn(value => !value);
    }
  
    return (
      <>
        <View style={tw`bg-gray-300 w-full h-60px flex-row pl-2 pr-2 items-center rounded-lg`}>
        <View style={tw`w-1/2 pr-4`}>      
        <TouchableOpacity style={!isOpen ? tw`bg-white h-45px p-3 rounded-lg w-full` : tw`bg-gray-200 h-45px p-3 rounded-lg w-full`} onPress={toggleOpen}  activeOpacity={0.6}>
          <Text style={tw`text-center`}>{title}</Text>
        </TouchableOpacity>
        </View>
        <View style={tw`w-1/2 pr-2`}> 
        <TouchableOpacity style={!isOpenn ? tw`bg-white h-45px p-3 rounded-lg w-full` : tw`bg-gray-200 h-45px p-3 rounded-lg w-full`} onPress={toggleOpenn}  activeOpacity={0.6}>
        <Text style={tw`text-center`}>Registros</Text>
        </TouchableOpacity>
        </View>
        </View>
        <View style={[styles.list, !isOpen  ? styles.hidden : undefined]}>
          {children}
        </View>
        <View style={[styles.list, !isOpenn ? styles.hidden : undefined]}>
          {children1}
        </View>   
      </>
    );
  };

  const styles = StyleSheet.create({
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden'
    },
  });