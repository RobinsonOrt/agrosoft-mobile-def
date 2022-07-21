import global from "../global";
import React, {useState} from "react";
import tw from "twrnc";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import Logo from "../assets/logo.png";
import Background from "../assets/background.png";
import { BlurView } from "expo-blur";
import { Link } from "react-router-native";
import NetInfo from '@react-native-community/netinfo';
import { useNavigate } from "react-router-native";

export default function ContactUs({navigation}) {

  
  
  const navigate = useNavigate();
  
  const unsubscribe = NetInfo.addEventListener(state => {
    
    if(!state.isConnected){
      redirectConnection();
    }
  });

  const redirectConnection = () => {
    global.urlConnected = "/";
    navigate("/notConected");
  }

  const styles = StyleSheet.create({
    colorView: {     
      backgroundColor: "rgba(14, 24, 7, 1)"      
    },
    colorButton: {
      backgroundColor: "rgba(33, 75, 7, 0.58)"      
    },
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden'
    },
  });

  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`flex justify-center`}>
      <View style={tw`h-full w-full flex items-center justify-center px-42 pt-10`}>
        <SubHeader title={"Contactenos"} style={styles.heading}/>
        <ScrollView style={styles.container}>
            <View style={tw`justify-center items-center p-2.5 gap-4 absolute top-32 rounded-lg`}>
                <Text style={tw`text-center `}>Desarrolladores</Text>
                <View style={tw``}>

                </View>
            </View>
            
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    cardBush: {
      backgroundColor: "red",
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
      overflow: "hidden",
    },
    sectionTitle: {
      fontSize: 16,
      height: 30,
      marginLeft: "5%",
      marginTop: "5px",
    },
    sectionDescription: {
      fontSize: 20,
      fontFamily: "Roboto",
      height: 30,
      marginLeft: "5%",
    },
    divider: {
      borderBottomColor: "grey",
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: "100%",
    },
  });