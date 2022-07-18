import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../components/SubHeader";
import { styles } from "./Farms";
import MyCoffeeBushContext from "../context/CoffeeBushContext";
import { CardBush } from "../components/CardBush";
import CardCoffeeButton from "../components/CardCoffeeButton";
import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import Enter from "../assets/Enter.png";
import Actividades from "../assets/Actividades.png";
import Delete from "../assets/delete.png"
import AddButton from "../components/AddButton";
import ScanButton from "../components/ScanButton";
import ModalDelete from "../components/ModalDelete";
import ModalAddCoffeeBush from "../components/ModalAddCoffeeBush";

const CoffeeBush = ({ navigation }) => {
    
    const [isModalOpenAddCoffeeBush, setIsModalOpenAddCoffeeBush] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const { GetCoffeeBushs, coffeeBushs, sorters, maxPage, FindCoffeeBush, DeleteCoffeeBush, setCoffeeBush } = useContext(MyCoffeeBushContext);

    useEffect(() => {
        GetCoffeeBushs(global.idCrop);
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Arbustos"} />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={tw`flex-row justify-between`}>
                            <View style={tw``}>
                                <SorterComponent sorters={sorters} sorter={"created_date"} GetElements={GetCoffeeBushs} firstParameter={global.idCrop} />
                                <ScanButton onPress={() => console.log("scan")} />
                            </View>
                            <View style={tw`items-end`}>
                                <SearchComponent GetElements={FindCoffeeBush} GetOriginalElements={GetCoffeeBushs} secondParameter={global.idCrop} />
                                <AddButton onPress={() => setIsModalOpenAddCoffeeBush(!isModalOpenAddCoffeeBush)} />
                            </View>
                        </View>

                        <ModalAddCoffeeBush
                            isModalOpenAddCoffeeBush={isModalOpenAddCoffeeBush}
                            setIsModalOpenAddCoffeeBush={setIsModalOpenAddCoffeeBush}
                        />

                        <ModalDelete
                            isModalOpenDelete={isModalOpenDelete}
                            setIsModalOpenDelete={setIsModalOpenDelete}
                            DeleteFunction={DeleteCoffeeBush}
                        />
                    </View>

                    <View style={[tw`flex flex-wrap flex-row justify-center items-center`]}>
                        {coffeeBushs.length > 0 ? (
                            coffeeBushs.map((coffeeBush, index) => {
                                return (
                                    <CardBush qrCode={coffeeBush.qrCode} id={coffeeBush.idCoffeeBush} date={coffeeBush.createdDdate} key={index}>
                                        <CardCoffeeButton onPress={() => console.log("ddhd")} color={"rgba(88, 155, 47, 1)"} icon={Actividades} />
                                        <CardCoffeeButton onPress={() => { setCoffeeBush(coffeeBush), navigation.navigate("EnterCoffeeBush")}} color={"rgba(34, 197, 94, 1)"} icon={Enter} />
                                        <CardCoffeeButton onPress={() => { global.idToDelete = coffeeBush.idCoffeeBush, setIsModalOpenDelete(!isModalOpenDelete) }} color={"rgba(239, 68, 68, 1)"} icon={Delete} />
                                    </CardBush>
                                )
                            })) : (<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}

                    </View>
                    <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetCoffeeBushs} firstParameter={global.idCrop} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default CoffeeBush;