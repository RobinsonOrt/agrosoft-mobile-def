import { REACT_APP_API_URL } from "@env";
import global from "../global";
import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    Modal,
} from "react-native";
import MyCoffeeBushContext from "../context/CoffeeBushContext";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";
import Barcode from "../components/Barcode";
import ModalButton from "../components/ModalButton";
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';


import SubHeader from "../components/SubHeader";

const EnterCoffeeBush = ({ navigation }) => {

    const { coffeeBush, GetBarCodeCoffeeBush } = useContext(MyCoffeeBushContext);

    
    const downloadPdf = async () => {
    const response = await GetBarCodeCoffeeBush(coffeeBush.idCoffeeBush);
    
    if (response.data.error) {
      return;
    }

    const base64Data = response.data.dataBase64;
    const fileName = coffeeBush.qrCode + "barcode";

    const picturesUri = StorageAccessFramework.getUriForDirectoryInRoot('Documents');
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(picturesUri);
    if (permissions.granted) {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
        })
    }

  }
    
   

    return (
        <View style={tw`h-full w-full px-0`}>
            <SubHeader title={"Informacion de arbusto"} />
            <ScrollView style={tw`h-95% mt-2`} >
                <View style={tw`px-15px pv-5px`}>
                    <View style={[tw`rounded-15px mx-5 justify-center border`, { backgroundColor: "rgba(32, 84, 0, 0.1)", borderColor: "rgba(32, 84, 0, 0.39)" }]}>
                        <View style={[tw`h-50px items-center w-full flex-row rounded-t-15px`, { backgroundColor: "rgba(32, 84, 0, 0.1)" }]}><Text style={tw`text-center grow text-black text-18px font-bold uppercase`}>{coffeeBush.qrCode}</Text></View>

                        <View style={tw`w-full items-center flex-row justify-center mb-2`}>
                            <Barcode value={coffeeBush.qrCode} options={{ format: 'CODE128', background: "rgba(255,255,255,0)", width: "2" }} />
                        </View>
                        <View style={tw`w-full px-3`}>
                            <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                <Text style={tw`text-12px font-bold text-center mr-2`}>ID:</Text>
                                <Text style={tw`text-10px mr-2`}>{coffeeBush.idCoffeeBush}</Text>
                            </View>
                            <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                <Text style={tw`text-12px font-bold text-center mr-2`}>Fecha de creacion:</Text>
                                <Text style={tw`text-12px text-center mr-2`}>{coffeeBush.createdDdate.split('T')[0]}</Text>
                            </View>
                            <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                <Text style={tw`text-12px font-bold text-center mr-2`}>Registro de revision de plagas:</Text>
                            </View>
                            <View style={tw`w-full items-center mt-1 justify-center mb-2`}>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo plagas Registro 1</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo plagas Registro 2</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo plagas Registro 3</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo plagas Registro 4</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo plagas Registro 5</Text>
                            </View>
                            <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2 mb-3`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                <Text style={tw`text-12px font-bold text-center mr-2`}>Enfermedades:</Text>
                            </View>
                            <View style={tw`w-full items-center mt-1 justify-center mb-2`}>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo enfermedad 1</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo enfermedad 2</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo enfermedad 3</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo enfermedad 4</Text>
                                <Text style={tw`text-12px text-center mr-2`}>Ejemplo enfermedad 5</Text>
                            </View>
                        </View>
                    </View>
                    <View style={tw`items-center`}>
                        <View style={tw`mt-10 w-75% items-center justify-center`}>
                            <ModalButton text={"Descargar codigo de barras"} onPress={() => {downloadPdf()}} color={"rgba(248, 189, 35, 1)"}/>
                            <ModalButton text={"Cerrar"} onPress={() => {navigation.navigate("CoffeeBush")}} color={"rgba(239, 68, 68, 1)"}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EnterCoffeeBush;