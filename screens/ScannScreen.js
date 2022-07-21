import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackHandler,
    ScrollView,
    TextInput,
} from "react-native";
import tw from "twrnc";
import { BarCodeScanner } from "expo-barcode-scanner";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Farms";
import SubHeader from "../components/SubHeader";
import MyCoffeeBushContext from '../context/CoffeeBushContext';
import global from "../global";

const ScannScreen = ({ navigation }) => {
    const { GetCoffeeBushByQr } = useContext(MyCoffeeBushContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [localError, setLocalError] = useState({error: false, message: ''});
    const [scan, setScan] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setScanned(false);
        const response = await GetCoffeeBushByQr(data, global.idCrop);
        if(response.data.error){
            setLocalError({error: true, message: response.data.response});
            return;
        }
        navigation.navigate("EnterCoffeeBush");
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso a la camara</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sin acceso a la camara</Text>;
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Escanear codigo de barras"} />
                {localError.error ? (
                    <Text style={tw`text-red-600 mb-2 text-center`}>{localError.message}</Text>
                ) : null}
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </SafeAreaView>
        </SafeAreaProvider>

    );
}

export default ScannScreen;