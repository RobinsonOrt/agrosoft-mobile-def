import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CartButton = ({ text, onPress, color, image}) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: color      
        },
      });
    
    return (

        <View style={tw`w-1/3 pr-2`}> 
        <TouchableOpacity style={[tw`justify-between items-center flex-row h-35px w-full px-1 pr-2 rounded-18px`, styles.colorButton]} onPress={onPress}  activeOpacity={0.6}>
        <Text style={tw`text-center text-white grow`}>{ text }</Text>
        <Image source={image} style={tw`h-15px w-15px`}/>
        </TouchableOpacity>
        </View>
    )
    
}

export default CartButton