import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Picker, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import tw from "twrnc";
import MyLaborsContext from "../context/LaborsContext";
import MyEmployeesContext from "../context/EmployeeContext";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";

export default function ModalChangeLabor({ isModalOpenChangeLabor, setIsModalOpenChangeLabor }) {

    const { LoadLabors, labors } = useContext(MyLaborsContext);
    const { ChangeLabor, selectedUserRole } = useContext(MyEmployeesContext);
    const [selectedLabor, setSelectedLabor] = useState(0);
    const [localError, setLocalError] = useState(false);
    const [localMessage, setLocalMessage] = useState("");

    const onSubmit = () => {
        if (selectedLabor === undefined || selectedLabor === "0") {
            setLocalError(true);
            setLocalMessage("Seleccione una labor");
            return;
        }
        if (selectedLabor == selectedUserRole) {
            setLocalError(true);
            setLocalMessage("Eleccione un cargo diferente al actual");
            return;
        }
        setLocalError(false);
        setLocalMessage("");
        const data = {};
        data.idUser = global.idEmployee;
        data.idFarm = global.idFarm;
        data.idSubRole = selectedLabor;
        ChangeLabor(data);
        setIsModalOpenChangeLabor(false);


    }

    useEffect(() => {
        LoadLabors("name_sub_role", "asc");
    }, []);

    return (
        <>
            <ModalModel isModalOpen={isModalOpenChangeLabor} setIsModalOpen={setIsModalOpenChangeLabor}>
                <Text style={tw`text-3xl font-bold text-black  mb-3`}>
                    Modificar cargo
                </Text>
                <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
                    <View style={tw`w-full px-7`}>
                        {localError ? (
                            <Text
                                style={tw`text-white bg-red-500 p-5 mb-2 rounded-lg font-bold text-center`}
                            >
                                {localMessage}
                            </Text>
                        ) : null}
                        <Text style={tw`text-black text-16px pt-1 mb-3`}>
                            Cargo asignado:
                        </Text>
                        <View style={[tw`h-40px justify-center w-full bg-red-300 rounded-9px mb-5`, {backgroundColor: "rgba(255, 255, 255, 1)", borderColor: "rgba(156, 163, 175, 1)", borderWidth: 1}]}>
                        <Picker
                            selectedValue={selectedUserRole == null ? "0" : selectedUserRole}
                            style={tw` text-base w-full`}
                            onValueChange={(itemValue) => { setSelectedLabor(itemValue) }
                            }>
                            <Picker.Item label={"Seleccionar Cargo"} value={"0"} />
                            {labors.map((labor, index) => {
                                return (
                                    <Picker.Item label={labor.nameSubRole} value={labor.idSubRole} key={index} />
                                )
                            })}
                        </Picker>
                        </View>
                        <ModalButton text={"Confirmar"} onPress={onSubmit} color={"#22C55E"} />
                        <ModalButton text={"Cancelar"} onPress={() => { setLocalError(false), setIsModalOpenChangeLabor(!setIsModalOpenChangeLabor) }} color={"rgba(220, 38, 38, 0.86)"} />
                    </View>
                </ScrollView>

            </ModalModel>
        </>
    )
}