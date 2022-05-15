import global from "../global";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import NoConnection from "../assets/noConnection.png";
import CheckIcon from "../assets/checkIcon.jpg";
import tw from 'twrnc'
import NetInfo from '@react-native-community/netinfo';
import { useNavigate } from "react-router-native";

export default function NotConected() {
    const [msgError, setMsgError] = useState("");

    const navigate = useNavigate();

    const tryAgain = () => {
        setMsgError("")
        const url = global.urlConnected;
        NetInfo.fetch().then(state => {
            if(state.isConnected){
                global.urlConnected = "";
                navigate(url)
                return false;
            }else{
                setMsgError("No hay conexion!")
            }
        });
    }

    return (
        <View style={tw`h-full flex items-center justify-center px-5`}>
            <View style={tw`bg-yellow-600 items-center p-5 rounded-xl`}>
                <Text style={tw`text-4xl font-bold text-white `}>AgroSoft</Text>
                <Image source={NoConnection} style={tw`h-40 w-40 my-16`} />
                <Text style={tw`text-xl text-white mb-5 font-bold`}>
                    No hay conexion a internet
                </Text>
                <Text style={tw`text-white mb-5 text-center`}>
                    <Image source={CheckIcon} style={tw`h-3 w-3 mr-2`} />
                    Compruebe la conexion de su dispositivo
                </Text>
                <Text style={tw`text-white mb-5 text-center`}>
                    <Image source={CheckIcon} style={tw`h-3 w-3 mr-2`} />
                    Volver a conectar a la red wifi
                </Text>
                {msgError ? <Text style={tw`text-white mb-5 text-center`}>{msgError}</Text> : null}
                <TouchableOpacity
                    style={tw`bg-yellow-600 p-3 rounded-lg`}
                    onPress={tryAgain}
                >
                    <Text style={tw`text-lg text-white text-center`}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}