import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuButtonItem = ({ text, onPress, status }) => {
    return (
        <TouchableOpacity style = {status ? tw`bg-gray-200 w-full h-60px` : tw`bg-white-100 w-full h-60px`} onPress={ onPress }>
            <Text style = {tw`pt-5 pl-3`}>{ text }</Text>
        </TouchableOpacity>
    )

}

export default MenuButtonItem