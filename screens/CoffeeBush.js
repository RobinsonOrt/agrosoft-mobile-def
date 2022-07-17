import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../components/SubHeader";
import { styles } from "./Farms";
import MyCoffeeBushContext from "../context/CoffeeBushContext";
import { CardBush } from "../components/CardBush";

const CoffeeBush = ({ navigation }) => {

    const { GetCoffeeBushs, coffeeBushs } = useContext(MyCoffeeBushContext);

    useEffect(() => {
        GetCoffeeBushs(global.idCrop);
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Arbustos"} />
                <View style={styles.container}>
                    <View style={tw`flex-row justify-between`}>
                        <View style={tw``}>
                            sorter
                            {/* <SorterComponent sorters={sorters} sorter={"name_farm"} GetElements={LoadFarms} /> */}
                        </View>
                        <View style={tw`items-end`}>
                            buttons
                            {/* <SearchComponent GetElements={FindFarms} GetOriginalElements={LoadFarms} />
                            <AddButton onPress={() => setIsModalOpenAddFarm(!isModalOpenAddFarm)} /> */}
                        </View>
                    </View>
                </View>
                {coffeeBushs.length > 0 ? (
                    coffeeBushs.map((coffeeBush, index) => {
                        return(
                            <CardBush qrCode={coffeeBush.qrCode} id={coffeeBush.idCoffeeBush} date={coffeeBush.createdDdate} key={index}>
                            </CardBush>
                        )
                    })) : (<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CoffeeBush;