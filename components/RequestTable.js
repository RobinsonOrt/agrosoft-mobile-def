import React, { useState, useContext } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import MyRequestsMyFarmsContext from "../context/RequestsMyFarmsContext";


import { TouchableOpacity } from "react-native-gesture-handler";


export const RequestTable = ({ title, children, children1 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenn, setIsOpenn] = useState(false);

    const { LoadMyRequests, setMyRequests } = useContext(MyRequestsMyFarmsContext);
  
    const toggleOpen = async () => {
      if(isOpen == false){
          setMyRequests([]);
          setIsOpen(true) 
          setIsOpenn(false)
          LoadMyRequests("1", 0);
          
      }
    
      //setIsOpen(value => !value);
      
    }
    const toggleOpenn = async () => {
      if(isOpenn == false){
          setMyRequests([]);
          setIsOpenn(true)
          setIsOpen(false)
          LoadMyRequests("2", 0);
          
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