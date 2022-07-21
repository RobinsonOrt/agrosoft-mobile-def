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

export default function Home({navigation}) {

  
  
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
        
        <Image source={Logo} style={tw`h-30px w-263px mb-10`} />

      
          <View style={[tw`py-15px px-10px rounded-2xl w-80 mt-30`, styles.colorView ]}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[tw`h-45px text-lg text-white py-9px rounded-2xl mb-7 font-bold uppercase text-center`, styles.colorButton]}>
                Ingresar
              </Text>
            </TouchableOpacity>

            <View style={tw`flex-row content-between items-center mb-7`}>
              <View style={tw`w-1/2 h-0`}><View style={tw`h-1px opacity-50 bg-white ml-2 mr-5`}/></View>
              <View style={tw`w-1/2 h-0`}><View style={tw`h-1px opacity-50 bg-white mr-2 ml-5`}/></View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[tw`h-45px text-lg text-white py-9px rounded-2xl font-bold uppercase text-center`, styles.colorButton]}>
                Registrarse
              </Text>
            </TouchableOpacity>

          </View>

      </View>
    </ImageBackground>
  );
}

