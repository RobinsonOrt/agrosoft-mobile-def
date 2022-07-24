import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CartButtonCrop = ({ text, onPress, color, icon}) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: color      
        },
      });
    
    return (

        
        <TouchableOpacity style={[tw`justify-between items-center flex-row h-24px px-1 pr-1 rounded-7px`, styles.colorButton]} onPress={onPress}  activeOpacity={0.6}>
        <Text style={tw`text-center text-white grow uppercase text-12px`}>{ text }</Text>
            {icon}
        </TouchableOpacity>
        
    )
    
}

export default CartButtonCrop