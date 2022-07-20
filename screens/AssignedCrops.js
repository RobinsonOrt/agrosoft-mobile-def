import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    ScrollView
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import AddButton from "../components/AddButton";

import tw from "twrnc";
import SubHeader from "../components/SubHeader";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Farms";
import MyCropUserContext from "../context/CropUserContext";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import Pagination from "../components/Pagination";
import ModalDeleteCropUser from "../components/ModalDeleteCropUser";
import { AccordionAssignedCrops } from "../components/AccordionAssignedCrops";
import ButtonCard from "../components/ButtonCard";
import ModalAddCropUser from "../components/ModalAddCropUser";


const AssignedCrops = ({ navigation }) => {
    const { GetCropUsers, cropUsers, FindCropUsers, maxPage, sorters, DeleteCropUser, GetCropsToSet } = useContext(MyCropUserContext);
    const [isModalOpenDeleteCropUser, setIsModalOpenDeleteCropUser] = useState(false);
    const [isModalOpenAddCropUser, setIsModalOpenAddCropUser] = useState(false);
    useEffect(() => {
        GetCropUsers(global.idEmployee);
    }, []);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Cultivos Asignados"} />
                <ScrollView style={tw`h-95%`} >
                    <View style={styles.container}>
                        <View style={tw`flex-row justify-between mb-4`}>
                            <View style={tw``}>
                                <SorterComponent sorters={sorters} sorter={"name_crop"} GetElements={GetCropUsers} firstParameter={global.idEmployee} />
                            </View>
                            <View style={tw`items-end`}>
                                <SearchComponent GetElements={FindCropUsers} GetOriginalElements={GetCropUsers} secondParameter={global.idEmployee} />
                                <AddButton onPress={() => {GetCropsToSet(global.idEmployee), navigation.navigate("AddCropUser")}} />
                            </View>
                        </View>
                        <ModalDeleteCropUser
                            isModalOpenDeleteCropUser={isModalOpenDeleteCropUser}
                            setIsModalOpenDeleteCropUser={setIsModalOpenDeleteCropUser}
                            DeleteFunction={DeleteCropUser}
                        />
                        <ModalAddCropUser
                            isModalOpenAddCropUser={isModalOpenAddCropUser}
                            setIsModalOpenAddCropUser={setIsModalOpenAddCropUser}
                        />
                        {cropUsers.length > 0 ? (
                            cropUsers.map((cropUser, index) => {
                                return (
                                    <AccordionAssignedCrops name={cropUser.nameCrop} text={"descripcion:"} value={cropUser.descriptionCrop} hei={270} key={index} >
                                        <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                            <Text style={tw`text-12px font-bold text-center mr-2`}>Numero de arbustos:</Text>
                                            <Text style={tw`text-12px text-center mr-2`}>{cropUser.cantCoffeeBush}</Text>
                                        </View>
                                        <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                            <Text style={tw`text-12px font-bold text-center mr-2`}>Variedad del café:</Text>
                                            <Text style={tw`text-12px text-center mr-2`}>{cropUser.coffeeVariety}</Text>
                                        </View>
                                        <View style={[tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2 mb-2`, { backgroundColor: "rgba(32, 84, 0, 0.15)", borderColor: "rgba(156, 163, 175, 1)" }]}>
                                            <Text style={tw`text-12px font-bold text-center mr-2`}>Edad (Años):</Text>
                                            <Text style={tw`text-12px text-center mr-2`}>{cropUser.ageCrop}</Text>
                                        </View>
                                        <ButtonCard text={"Eliminar"} onPress={() => {global.idCrop = cropUser.idCrop, setIsModalOpenDeleteCropUser(!isModalOpenDeleteCropUser)}} color={"rgba(239, 68, 68, 1)"} icon={<AntDesign name="delete" size={18} color="white" />} />
                                    </AccordionAssignedCrops>
                                );
                            })
                        ) : (
                            <View style={styles.container}>
                                <Text style={tw`text-center text-gray-500`}>
                                    No se encontraron resultados
                                </Text>
                            </View>
                        )}
                    </View>
                    <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetCropUsers} firstParameter={global.idEmployee} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default AssignedCrops;