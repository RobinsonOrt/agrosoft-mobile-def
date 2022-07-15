import React from 'react'
import tw from 'twrnc'
import { TextInput, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import Clean from '../assets/clean.png'

const CleanButton = ({}) => {

    const styles = StyleSheet.create({
        colorButton: {     
          backgroundColor: 'rgba(120, 212, 63, 1)'      
        },
      });
    
    return (

        <View style={tw``}> 
        <TouchableOpacity style={[tw`justify-between items-center flex-row h-28px w-108px px-1 pr-2 mt-1 rounded-md shadow-2xl`, styles.colorButton]}   activeOpacity={0.6}>
        <Text style={tw`text-center text-white text-14px grow uppercase font-bold`}>Limpiar</Text>
        <Image source={Clean} style={tw`h-14px w-14px`}/>
        </TouchableOpacity>
        </View>
    )
}

export default CleanButton