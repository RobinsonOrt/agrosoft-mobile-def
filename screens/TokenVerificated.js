import global from "../global";
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import tw from 'twrnc'
import NetInfo from '@react-native-community/netinfo';



export default function TokenVerificated() {

    let navigate = useNavigate()
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if(!state.isConnected){
          redirectConnection();
        }
      });
      const redirectConnection = () => {
        global.urlConnected = "/accountActivated";
        navigate("/notConected");
      }
    
    const redirect = () => {
        navigate('/login');
    }
    return (
        <View style={tw`h-full flex items-center justify-center px-5`}>
            <Text style={tw`text-3xl font-bold text-black mb-20`}>
                Cuenta Activada con exito
            </Text>
            <View style={tw`bg-yellow-600 p-5 rounded-xl`}>
                <Text style={tw`text-lg text-black leading-tight`}>
                    Su cuenta se ha activado exitosamente, puede iniciar sesión.
                    {"\n"}{"\n"}
                </Text>
                <TouchableOpacity style={tw`bg-yellow-700 p-5 mt-5 rounded-xl`}><Text style={tw`text-white text-center font-bold`} onPress={redirect} >Iniciar Sesion</Text></TouchableOpacity>
            </View>
        </View>
    )
}