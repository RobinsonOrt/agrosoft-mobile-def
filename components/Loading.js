import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View,ImageBackground, Image } from 'react-native'
import { Overlay } from 'react-native-elements'
import tw from "twrnc";
import Logo from "../assets/logo.png";
import Background from "../assets/background.png";

export default function Loading({isVisible}) {
  return (
    <ImageBackground source={Background} resizeMode="cover" style={tw`flex justify-center`}>
      <View style={tw`h-full w-full items-center px-42 pt-30`}>
      <Image source={Logo} style={tw`h-30px w-263px mb-10`} />
    <Overlay isVisible={isVisible}
     windowBackgroundColor="rgba(0.0.0.0.5)"   
     overlayBackgroundColor="transparent"
     overlayStyle={styles.overlay}
    >
        <Text style={tw`text-center text-20px font-semibold mb-5 text-white`}>Espera un momento...</Text>
        <View style={tw`w-full items-center h-55% flex-row justify-center`}>
            
            <ActivityIndicator color="rgba(120, 212, 63, 1)" size="large"/>
                
            
        </View>
    </Overlay>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    overlay: {
        maxHeight: 200,
        width: 280,
        backgroundColor: "rgba(14, 24, 7, 1)",
        borderColor:"rgba(14, 24, 7, 1)",
        borderWidth: 2, 
        borderRadius: 10,
    },

})


