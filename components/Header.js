import React from "react"
import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
import tw from "twrnc"
import Agrosoft from "../assets/agrosoft.png";
import Profile from "../assets/profile.png";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';



export const HeaderTitle = ({navigation}) => { 
    const isDrawerOpen = useDrawerStatus() === 'closed';
    return(
                            isDrawerOpen ? (<View style={tw`items-center flex-row`}>
                                <TouchableOpacity style={tw``} onPress={() => navigation.navigate('Mis fincas')}>
                                    <Image source={Agrosoft} style={tw`h-53px w-205px`}/>
                                </TouchableOpacity>
                            </View>): null
          )                  
}

export const HeaderRight = ({navigation}) => 
                            ( 
                                <View style={tw`items-center flex-row`}>
                                    <TouchableOpacity style={tw`mr-1`} onPress={() => navigation.navigate('Administrar perfil')}>
                                        <Image source={Profile} style={tw`h-30px w-30px`}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`pl-1`} onPress={() =>  navigation.openDrawer()}>
                                        <SimpleLineIcons name="menu" size={25} color="white" />
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
