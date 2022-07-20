import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const ButtonCard = ({ text, onPress, color, icon}) => {
    
    const styles = StyleSheet.create({
        colorButton: {
            backgroundColor: color,
        },
    });

    return (

        <TouchableOpacity
            style={[tw`justify-center p-2 flex-row rounded-xl`, styles.colorButton]}
            onPress={onPress}
            activeOpacity={0.6}
        >
            <Text style={tw`text-center font-bold uppercase text-white mr-2`}>{text}</Text>
            {icon}
        </TouchableOpacity>
        
    )
}

export default ButtonCard