import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CardCoffeeButton = ({ onPress, color, icon}) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: color      
        },
      });
    
    return (
        <TouchableOpacity style={[tw`justify-between items-center flex-row h-34px w-34px px-1 pr-1 rounded-7px ml-2`, styles.colorButton]} onPress={onPress}  activeOpacity={0.6}>
        {/* <Text style={tw`text-center text-white grow uppercase text-12px`}>{ text }</Text> */}
            <Image source={icon} style={tw`h-24px w-24px`}/>
        </TouchableOpacity>
        
    )
    
}

export default CardCoffeeButton