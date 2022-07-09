import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const ButtonForm = ({ title, onPress, color}) => {
    
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: color      
        },
      });

    return (

        <TouchableOpacity onPress={ onPress } style={[tw`flex-row mx-2 content-between items-center h-40px mb-5 rounded-10px`, styles.colorButton]}>
            <Text style={tw`text-white text-center grow uppercase font-semibold text-16px `}>{ title }</Text>
        </TouchableOpacity>
        
    )
}

export default ButtonForm