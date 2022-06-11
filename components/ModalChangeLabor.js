import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Picker, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import tw from "twrnc";
import MyLaborsContext from "../context/LaborsContext";
import MyEmployeesContext from "../context/EmployeeContext";

export default function ModalChangeLabor({ isModalOpenChangeLabor, setIsModalOpenChangeLabor }) {

    const { LoadLabors, labors } = useContext(MyLaborsContext);
    const { ChangeLabor } = useContext(MyEmployeesContext);
    const [selectedLabor, setSelectedLabor] = useState();
    const [localError, setLocalError] = useState(false);
    const [localMessage, setLocalMessage] = useState("");

    const modalContainerStyle = {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
    }

    const modalStyle = {
        backgroundColor: 'white',
        alignItems: 'center',
        margin: 20,
        borderRadius: 16,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    };

    const onSubmit = () => {
        if (selectedLabor === undefined || selectedLabor === "0") {
            setLocalError(true);
            setLocalMessage("Seleccione una labor");
        } else {
            setLocalError(false);
            setLocalMessage("");
            const data = {};
            data.idUser = global.idEmployee;
            data.idFarm = global.idFarm;
            data.idSubRole = selectedLabor;
            ChangeLabor(data);
            setIsModalOpenChangeLabor(false);
        }

    }

    useEffect(() => {
        LoadLabors("name_sub_role", "asc");
    }, []);

    return (
        <>
            <Modal visible={isModalOpenChangeLabor} transparent={true} animationType={'fade'}>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}>
                        <View style={tw`h-full flex items-center justify-center`}>
                            <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
                                Modificar cargo
                            </Text>
                            <ScrollView style={tw`mt-2`}>
                                <View style={tw`px-7 mb-10 flex items-center justify-center`}>
                                    <Text style={tw` text-black mb-10 w-283px  text-center`}>
                                        Selecciona un cargo para el empleado
                                    </Text>
                                    {localError ? (
                                        <Text
                                            style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                                        >
                                            {localMessage}
                                        </Text>
                                    ) : null}
                                    <Picker
                                        selectedValue={selectedLabor}
                                        style={tw`bg-slate-50 text-base px-5 py-3 rounded-lg w-full mb-5 pl-0 pr-0 border-b border-yellow-700`}
                                        onValueChange={(itemValue) =>
                                            setSelectedLabor(itemValue)
                                        }>
                                            <Picker.Item label={"Seleccionar Cargo"} value={"0"} /> 
                                        {labors.map((labor, index) => {
                                            return (
                                                <Picker.Item label={labor.nameSubRole} value={labor.idSubRole} key={index} />
                                            )
                                        })}
                                    </Picker>
                                    <TouchableOpacity
                                        style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                        onPress={onSubmit}
                                    >
                                        <Text style={tw`text-lg text-white text-center`}>Guardar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                        onPress={() => setIsModalOpenChangeLabor(!setIsModalOpenChangeLabor)}
                                    >
                                        <Text style={tw`text-lg text-white text-center`}>Cancelar </Text>
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}