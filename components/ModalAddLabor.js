import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";

import tw from "twrnc";
import { useForm } from "react-hook-form";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";


import NetInfo from '@react-native-community/netinfo';

import MyLaborsContext from "../context/LaborsContext";

export default function ModalAddLabor({ isModalOpenAddLabor, setIsModalOpenAddLabor }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { AddLabor } = useContext(MyLaborsContext);

  const [localError, setLocalError] = useState({ "error": false, "message": "" });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitAddLabor = async (data) => {
    data.idFarm = global.idFarm;
    const response = await AddLabor(data);
    if (response.data.error) {
      setLocalError({ "error": true, "message": response.data.response });
      return;
    }
    setLocalError({ "error": false, "message": "" });
    setIsModalOpenAddLabor(false);
  };

  return (
      <ModalModel isModalOpen={isModalOpenAddLabor} setIsModalOpen={setIsModalOpenAddLabor}>
        <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
          Agregar Cargo
        </Text>
        <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
          <View style={tw`w-full px-7`}>
            <Text style={tw`text-16px pb-2 pt-1`}>Nombre del cultivo</Text>
            <InputForm
              control={control}
              name="nameSubRole"
              placeholder="Nombre"
              autoCapitalize="words"
              maxLength={20}
              minLength={1}
              autoFocus={true}
              height={40}
              pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
            />
            {errors.nameSubRole?.type === "required" ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
            ) : errors.nameSubRole?.type === "pattern" ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>
                No se permiten caracteres especiales!
              </Text>
            ) : null}

            <Text style={tw`text-16px pb-2 pt-1`}>Descripción del cultivo</Text>
            <InputForm
              control={control}
              name="descriptionSubRole"
              placeholder="Descripcion"
              autoCapitalize="sentences"
              height={80}
              maxLength={150}
              minLength={15}
              multiline={true}
              pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
            />
            {errors.descriptionSubRole?.type === "required" ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
            ) : errors.descriptionSubRole?.type === "pattern" ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>
                No se permiten caracteres especiales!
              </Text>
            ) : errors.descriptionSubRole?.type === "minLength" ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>
                Minimo 15 caracteres!
              </Text>
            ) : null}

            {localError.error ? (
              <Text style={tw`text-red-600 mb-2 text-center`}>{localError.message}</Text>
            ) : null}
            <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitAddLabor)} color={"#22C55E"} />
            <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenAddLabor(!setIsModalOpenAddLabor), reset(), setLocalError({ "error": false, "message": "" }) }} color={"rgba(220, 38, 38, 0.86)"} />
          </View>
        </ScrollView>
      </ModalModel>
  )
}