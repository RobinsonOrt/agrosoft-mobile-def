import global from "../global";
import React, { useContext, useState } from "react";
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
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";

import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";

const ModalAddCoffeeBush = ({ isModalOpenAddCoffeeBush, setIsModalOpenAddCoffeeBush }) => {
    const { CreateCoffeeBush } = useContext(MyCoffeeBushContext);
    const [localError, setLocalError] = useState({ "error": false, "message": "" });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmitAddCoffeeBush = async (data) => {
        data.idCrop = global.idCrop
        const createCoffeeBushResponse = await CreateCoffeeBush(data);
        if (createCoffeeBushResponse.data.error) {
            setLocalError({ "error": true, "message": createCoffeeBushResponse.data.response });
            return;
        }
        //save pdf
        //end
        setLocalError({ "error": false, "message": "" });
        reset();
        setIsModalOpenAddCoffeeBush(false);
    }
    return (
        <ModalModel isModalOpen={isModalOpenAddCoffeeBush} setIsModalOpen={setIsModalOpenAddCoffeeBush}>
            <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
                Agregar Arbustos
            </Text>
            <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
                <View style={tw`w-full px-7`}>

                    <Text style={tw`text-16px pb-2 pt-1`}>Cantidad de arbustos</Text>
                    <InputForm
                        control={control}
                        name="cantBush"
                        placeholder="ej: 1000"
                        keyboardType="numeric"
                        height={40}
                        min={1}
                        max={10000}
                        pattern={/^[0-9]+$/}
                    />
                    {errors.cantBush?.type === "required" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
                    ) : errors.cantBush?.type === "pattern" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Solo numeros!</Text>
                    ) : errors.cantBush?.type === "min" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Minimo 1!</Text>
                    ) : errors.cantBush?.type === "max" ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>Maximo 10000!</Text>
                    ) : null}

                    {localError.error ? (
                        <Text style={tw`text-red-600 mb-2 text-center`}>{localError.message}</Text>
                    ) : null}
                    <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitAddCoffeeBush)} color={"#22C55E"} />
                    <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenAddCoffeeBush(!isModalOpenAddCoffeeBush), reset() }} color={"rgba(220, 38, 38, 0.86)"} />
                </View>
            </ScrollView>
        </ModalModel>
    )
}

export default ModalAddCoffeeBush;