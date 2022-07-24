import { REACT_APP_API_URL } from "@env";
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
} from "react-native";
import MyCropsContext from "../context/CropContext";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";


const ModalModifyCrop = ({isModalOpenModifyCrop, setIsModalOpenModifyCrop}) => {

  const { UpdateCrop, crop } = useContext(MyCropsContext);
  const [localError, setLocalError] = useState({"error": false, "message": ""});

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmitModifyCrop = async (data) =>{
      data.idCrop = crop.idCrop;
      data.idFarm = global.idFarm
      const updateCropResponse = await UpdateCrop(data);
      if(updateCropResponse.data.error){
        localError.error = true;
        localError.message = updateCropResponse.data.response;
        return;
      }
      setLocalError({"error": false, "message": ""});
      setIsModalOpenModifyCrop(false);
    }
    //useEffect to change whit crop
    useEffect(() => {
      reset({
        nameCrop: crop.nameCrop,
        descriptionCrop: crop.descriptionCrop,
        coffeeVariety: crop.coffeeVariety,
        ageCrop: crop.ageCrop,
      });
    }, [crop]);
    return(

      <ModalModel isModalOpen={isModalOpenModifyCrop} setIsModalOpen={setIsModalOpenModifyCrop}>
      <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
        Agregar Cultivo
      </Text>
      <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
        <View style={tw`w-full px-7`}>
        <Text style={tw`text-16px pb-2 pt-1`}>Nombre del cultivo</Text>
        <InputForm
            control={control}
            name="nameCrop"
            placeholder="Nombre"
            autoCapitalize="words"
            maxLength={10}
            minLength={5}
            autoFocus={true}
            height={40}
            pattern={/^[a-zA-Z ]+$/}
          />
          {errors.nameCrop?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.nameCrop?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Solo caracteres de la a - z!
            </Text>
          ) : errors.nameCrop?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Minimo 5 caracteres!
            </Text>
          ): null  }

        <Text style={tw`text-16px pb-2 pt-1`}>Descripción del cultivo</Text>
        <InputForm
            control={control}
            name="descriptionCrop"
            placeholder="Descripcion"
            autoCapitalize="sentences"
            height={80}
            maxLength={100}
            minLength={15}
            multiline={true}
            pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
          />
          {errors.descriptionCrop?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.descriptionCrop?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              No se permiten caracteres especiales!
            </Text>
          ) : errors.descriptionCrop?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Minimo 15 caracteres!
            </Text>
          ): null  }

        <Text style={tw`text-16px pb-2 pt-1`}>Variedad</Text>
        <InputForm
            control={control}
            name="coffeeVariety"
            placeholder="ej: Caturra"
            height={40}
            minLength={1}
            maxLength={20}
            pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
          />
          {errors.coffeeVariety?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.coffeeVariety?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              No se permiten caracteres especiales!
            </Text>
          ) : null}   
           
        <Text style={tw`text-16px pb-2 pt-1`}>Años del cultivo</Text>
        <InputForm
            control={control}
            name="ageCrop"
            placeholder="ej: 2"
            keyboardType="numeric"
            height={40}
            minLength={1}
            maxLength={7}
            pattern={/[+-]?([0-9]*[.])?[0-9]+/}
          />
          {errors.ageCrop?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : null}  

          {localError.error ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>{localError.message}</Text>
          ) : null}  
          <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitModifyCrop)} color={"#22C55E"}/>
          <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenModifyCrop(!setIsModalOpenModifyCrop), reset(), setLocalError({error: false, "message":""})}} color={"rgba(220, 38, 38, 0.86)"}/>
        </View>
      </ScrollView>
</ModalModel>

    )
}

export default ModalModifyCrop