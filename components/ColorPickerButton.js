import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const ColorPickerButton = ({ onPress, color,}) => {
    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: color
        },
    });

    return (
        <TouchableOpacity style={[tw`h-40px w-40px rounded-full`, styles.colorButton]} onPress={onPress}  activeOpacity={0.6} >
        </TouchableOpacity>
    )
}
export default ColorPickerButton