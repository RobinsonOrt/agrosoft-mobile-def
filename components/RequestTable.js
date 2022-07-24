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


export const RequestTable = ({ title, children, children1, isOpen,isOpenn }) => {
    

    const { LoadMyRequests, setMyRequests } = useContext(MyRequestsMyFarmsContext);
  
        
  
  
    return (
      <>
        
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