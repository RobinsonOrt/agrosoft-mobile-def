import React, { useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform, 
  Image,
} from "react-native";
import tw from "twrnc";


import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LogoUp from "../assets/up.png";
import LogoDown from "../assets/down.png";
import Info from "../assets/info.png";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";


export const Accordion = ({ title, children, children1 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenn, setIsOpenn] = useState(false);

  const toggleOpen = () => {
    if(isOpen == false){
        setIsOpen(true) 
        setIsOpenn(false)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  
    //setIsOpen(value => !value);
    
  }
  const toggleOpenn = () => {
    if(isOpenn == false){
        setIsOpenn(true)
        setIsOpen(false)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
      
    //setIsOpenn(value => !value);
  }

  return (
    <>
      <View style={tw`bg-gray-300 w-full h-60px flex-row pl-2 pr-2 items-center rounded-lg`}>
      <View style={tw`w-1/3 pr-4`}>      
      <TouchableOpacity style={tw`bg-white h-45px p-3 rounded-lg w-full`} onPress={toggleOpen}  activeOpacity={0.6}>
        <Text style={tw`text-center`}>Entrantes</Text>
      </TouchableOpacity>
      </View>
      <View style={tw`w-1/3 pr-2`}> 
      <TouchableOpacity style={tw`bg-white h-45px p-3  rounded-lg w-full`} onPress={toggleOpenn}  activeOpacity={0.6}>
      <Text style={tw`text-center`}>Salientes</Text>
      </TouchableOpacity>
      </View>
      <View style={tw`w-1/3 pl-2`}> 
      <TouchableOpacity style={tw`bg-white h-45px p-3  rounded-lg w-full`} onPress={toggleOpenn}  activeOpacity={0.6}>
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

const Requests = () => {
  const title=(
    <Text style={styles.sectionTitle} >Nombre finca </Text>
  )
  const body = (
    <View style={tw`bg-gray-200 w-full items-center flex-row p-4 pt-2 mt-4 rounded-xl`}>
      <View style={tw`items-center w-1/3  h-full`}>
            <Text style={tw`bg-blue-100 text-center mt-5`}>Farm name</Text>
      </View>
      <View style={tw`w-1/3 items-center`}>
          <Text>USER</Text> 
          <TouchableOpacity style={tw`bg-green-500 items-center w-full h-31px p-4 pt-1 mt-3 rounded-xl`}><Text style={tw`text-white text-center grow font-bold `}>Aceptar</Text></TouchableOpacity>
      </View>
      <View style={tw`w-1/3 items-center`}>
          <Text>Date</Text> 
          <TouchableOpacity style={tw`bg-red-500 items-center w-full h-31px p-4 pt-1 mt-3 rounded-xl`}><Text style={tw`text-white text-center grow font-bold `}>Rechazar</Text></TouchableOpacity>

      </View>
    </View>
  )

  const body1 = (
    <View style={tw`bg-gray-200 w-full items-center flex-row p-4 pt-2 mt-4 rounded-xl`}>
      <View style={tw`w-1/3 items-center`}>
            <Text style={tw`bg-blue-100 text-center`}>Farm name</Text>
      </View>
      <View style={tw`w-1/3 items-center`}>
          <Text>USER</Text> 
      </View>
      <View style={tw`w-1/3 items-center`}>
          <Text>Date</Text> 
          <TouchableOpacity style={tw`bg-red-500 items-center w-full h-31px p-4 pt-1 mt-3 rounded-xl`}><Text style={tw`text-white text-center grow font-bold `}>Cancelar</Text></TouchableOpacity>

      </View>
    </View>
  )
  return (
    
    <SafeAreaProvider>
        
    <SafeAreaView style={styles.safeArea}>
         
    
      <View style={styles.container}>
      

        <Accordion title={title} children={body} children1={body1}/>
          
        
        
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Requests;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 0,
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