import React from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

const ButtonDeleteActivitySubRole = ({ onPress, color, icon}) => {
    const styles = StyleSheet.create({
        colorButton: {
            backgroundColor: color,
        },
    });
    return(
    <TouchableOpacity
            style={[tw`justify-center p-2 h-60px w-60px flex-row rounded-xl items-center`, styles.colorButton]}
            onPress={onPress}
            activeOpacity={0.6}
        >
        {icon}
        </TouchableOpacity>
    )
}

export default ButtonDeleteActivitySubRole;