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
import MySubRoleActivityContext from "../context/SubRoleActivityContext";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import Pagination from "../components/Pagination";

import { CardSubRoleActivity } from "../components/CardSubRoleActivity";
import ButtonDeleteActivitySubRole from "../components/ButtonDeleteActivitySubRole";
import ModalDelete from "../components/ModalDelete";

const AssignedLabors = ({ navigation }) => {
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const { GetSubRoleActivities, subRoleActivities, FindSubRoleActivities, maxPage, sorters, DeleteSubRoleActivity, GetSubRoleActivitiesToSet } = useContext(MySubRoleActivityContext);

    useEffect(() => {
        GetSubRoleActivities(global.idSubRole);
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Actividades Asignadas"} />
                <ScrollView style={tw`h-95%`} >
                    <View style={styles.container}>
                        <View style={tw`flex-row justify-between mb-4`}>
                            <View style={tw``}>
                                <SorterComponent sorters={sorters} sorter={"name_activity"} GetElements={GetSubRoleActivities} firstParameter={global.idSubRole} />
                            </View>
                            <View style={tw`items-end`}>
                                <SearchComponent GetElements={FindSubRoleActivities} GetOriginalElements={GetSubRoleActivities} secondParameter={global.idSubRole} />
                                <AddButton onPress={async () => {await GetSubRoleActivitiesToSet(global.idSubRole), navigation.navigate("AddSubRoleActivity")}} />
                            </View>
                        </View>
                        <ModalDelete
                            isModalOpenDelete={isModalOpenDelete}
                            setIsModalOpenDelete={setIsModalOpenDelete}
                            DeleteFunction={DeleteSubRoleActivity}
                        />
                        {subRoleActivities.length > 0 ? (
                            subRoleActivities.map((subRoleActivity, index) => {
                                return (
                                    <CardSubRoleActivity name={subRoleActivity.nameActivity} description={subRoleActivity.descriptionActivity} >
                                        <ButtonDeleteActivitySubRole onPress={() => { global.idToDelete = subRoleActivity.idActivity, setIsModalOpenDelete(!isModalOpenDelete) }} color={"rgba(239, 68, 68, 1)"} icon={<AntDesign name="delete" size={30} color={"#fff"} />} />
                                    </CardSubRoleActivity>
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
                    <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetSubRoleActivities} firstParameter={global.idSubRole} />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default AssignedLabors;