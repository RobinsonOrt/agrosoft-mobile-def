import React from "react"
import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import tw from "twrnc"
import Agrosoft from "../assets/agrosoft.png";
import Profile from "../assets/profile.png";
import { SimpleLineIcons } from '@expo/vector-icons';

export const HeaderLeft = ({navigation}) => ( 
                                <View style={tw`items-center flex-row`}>
                                    <TouchableOpacity style={tw`pl-1`} onPress={() =>  navigation.openDrawer()}>
                                        <SimpleLineIcons name="menu" size={22} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw``} onPress={() => navigation.navigate('Mis fincas')}>
                                        <Image source={Agrosoft} style={tw`h-50px w-200px`}/>
                                    </TouchableOpacity>
                                </View>)

export const HeaderRight = ({navigation}) => ( 
                                <View style={tw`items-center flex-row`}>
                                    <TouchableOpacity style={tw`mr-1`} onPress={() => navigation.navigate('Administrar perfil')}>
                                        <Image source={Profile} style={tw`h-35px w-35px`}/>
                                    </TouchableOpacity>
                                </View> )

export const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#348800',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    })
