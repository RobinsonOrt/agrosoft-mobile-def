import global from "../global";
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigate } from "react-router-native";
import tw from 'twrnc'
import NetInfo from '@react-native-community/netinfo';
import Background from "../assets/background.png";
import ButtonForm from "../components/ButtonForm";
import { useBackHandler } from "@react-native-community/hooks";


export default function TokenVerificated({navigation}) {
    useBackHandler(() => {
        navigation.navigate("Login");
        return true;
    });
    return (
        <ImageBackground source={Background} resizeMode="cover" style={tw`h-full items-center justify-center`}>
            <View style={[tw`w-85% flex items-center justify-center rounded-20px py-30px px-10px`, styles.backgroundContainer]}>
                <Text style={tw`text-25px font-bold text-white mb-4`}>
                    Cuenta Activada con exito
                </Text>
                <Text style={tw`text-lg text-white leading-tight mb-5`}>
                    Su cuenta se ha activado exitosamente.
                </Text>
                <ButtonForm onPress={()=>navigation.navigate("Login")} title="iniciar sesion" color={"rgba(32, 84, 0, 1)"} />

            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "rgba(14, 24, 7, 1)"
    },
});