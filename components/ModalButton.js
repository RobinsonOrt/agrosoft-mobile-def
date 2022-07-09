import React from 'react'
import tw from 'twrnc'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ModalButton = ({ text, onPress, color}) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
            backgroundColor: color,     
        },
        
      });
    
    return (

        <View style={[tw`w-full mb-5`]}> 
        <TouchableOpacity style={[tw`h-48px w-full items-center rounded-md`, styles.colorButton]} onPress={onPress}  activeOpacity={0.6}>
        <Text style={tw`text-center text-18px text-white px-5 py-3`}>{ text }</Text>
        </TouchableOpacity>
        </View>
    )
    
}

export default ModalButton