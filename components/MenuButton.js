import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuButton = ({ title, onPress, isOpen, image, styleImage }) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: "rgba(139, 194, 66, 0.4)"      
        },
      });

    return (
        
        <TouchableOpacity onPress={ onPress } style={isOpen ? [tw`bg-gray-300 flex-row mx-5 px-2 content-between items-center h-30px mb-5 rounded-md rounded-b-none border-b-2 border-white`, styles.colorButton] : [tw`bg-white-100 flex-row mx-5  px-2 content-between items-center h-30px mb-5 rounded-md`, styles.colorButton] }>
            <View style={tw`h-16px w-23px`}><Image source={image} style={styleImage} /></View>
            <Text style={tw`text-white text-center grow uppercase text-16px `}>{ title }</Text>
        </TouchableOpacity>
        
    )
}

export default MenuButton