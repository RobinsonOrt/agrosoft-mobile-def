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
    StyleSheet,
} from "react-native";
import MyFieldsContext from "../context/FieldsContext";

import tw from "twrnc";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";

import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";
import RNPickerSelect from 'react-native-picker-select';

const ModalModifyField = ({ isModalOpenModifyField, setIsModalOpenModifyField }) => {
    const { dataTypes, UpdateField, field } = useContext(MyFieldsContext);
    const [localError, setLocalError] = useState({ "error": false, "message": "" });
    const [selectedDataType, setSelectedDataType] = useState(0);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmitUpdateField = async (data) => {
        data.idDataType = selectedDataType;
        data.idField = field.idField;
        const response = await UpdateField(data);
        if (response.data.error) {
            setLocalError({ "error": true, "message": response.data.response });
            return;
        }

        setLocalError({ "error": false, "message": "" });
        reset();
        setIsModalOpenModifyField(false);
    }
    
    useEffect(() => {
        setSelectedDataType(field.idDataType)
        reset({
            "nameField": field.nameField,
            "descriptionField": field.descriptionField
        })
    }, [field])
    return (
        <ModalModel isModalOpen={isModalOpenModifyField} setIsModalOpen={setIsModalOpenModifyField}>
            <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
                Modificar campo
            </Text>
            <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
                <View style={tw`w-full px-7`}>
                    <Text style={tw`text-16px pb-2 pt-1`}>Nombre del campo</Text>
                    <InputForm
                        control={control}
                        name="nameField"
                        placeholder="Nombre del campo"
                        autoCapitalize="words"
                        maxLength={50}
                        minLength={5}
                        autoFocus={true}
                        height={40}
                        pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
                    />
                    {errors.nameField?.type === "required" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.nameField?.type === "pattern" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                            No se permiten caracteres especiales!
                        </Text>
                    ) : errors.nameField?.type === "minLength" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                            Minimo 5 caracteres!
                        </Text>
                    ) : null}

                    <Text style={tw`text-16px pb-2 pt-1`}>Descripción del campo</Text>
                    <InputForm
                        control={control}
                        name="descriptionField"
                        placeholder="Descripcion del campo"
                        autoCapitalize="sentences"
                        height={80}
                        maxLength={100}
                        minLength={15}
                        multiline={true}
                        pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
                    />
                    {errors.descriptionField?.type === "required" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.descriptionField?.type === "pattern" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                            No se permiten caracteres especiales!
                        </Text>
                    ) : errors.descriptionField?.type === "minLength" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>
                            Minimo 15 caracteres!
                        </Text>
                    ) : null}

                    <Picker
                        onValueChange={(itemValue) => setSelectedDataType(itemValue)}
                        style={tw`bg-slate-50 text-base px-5 py-3 rounded-lg w-full mb-5 pl-0 pr-0 border-b border-yellow-700`}
                        selectedValue={selectedDataType}
                    >
                        {
                            dataTypes.length > 0 ? dataTypes.map((item2, index) => {
                                return (
                                    <Picker.Item label={item2.dataType} value={item2.idDataType} key={index} />
                                )
                            }) : <Picker.Item label="" value="" key="" />
                        }
                    </Picker>

                    {localError.error ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>{localError.message}</Text>
                    ) : null}
                    <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitUpdateField)} color={"#22C55E"} />
                    <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenModifyField(!isModalOpenModifyField), setLocalError({ "error": false, "message": "" }), reset() }} color={"rgba(220, 38, 38, 0.86)"} />
                </View>
            </ScrollView>
        </ModalModel>
    )
}
const customPickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        width: 321,// to ensure the text is never behind the icon
        marginBottom: 20
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#78D43F',
        borderRadius: 8,
        color: 'black',
        backgroundColor: 'white',
        paddingRight: 30,
        width: 321,
        marginBottom: 20
        // to ensure the text is never behind the icon
    },
    inputWeb: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#78D43F',
        borderRadius: 8,
        color: 'black',
        backgroundColor: 'white',
        paddingRight: 30,
        marginBottom: 20
    }
});
export default ModalModifyField;