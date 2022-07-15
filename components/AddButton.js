import React from 'react'
import tw from 'twrnc'
import { TextInput, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

const AddButton = ({onPress}) => {

    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: 'rgba(88, 155, 47, 1)',
          borderWidth: 1,
          borderColor: 'rgba(21, 128, 61, 1)',      
        },
      });
    
    return (

        <View style={tw`mt-2`}> 
        <TouchableOpacity style={[tw`justify-between items-center flex-row h-28px w-108px px-1 pr-2 mt-1 rounded-md shadow-2xl`, styles.colorButton]}  onPress={onPress} activeOpacity={0.6}>
        <Text style={tw`text-center text-white text-14px grow uppercase font-bold`}>Agregar</Text>
        <FontAwesome name="plus" size={14} color="white" />
        </TouchableOpacity>
        </View>
    )
}

export default AddButton