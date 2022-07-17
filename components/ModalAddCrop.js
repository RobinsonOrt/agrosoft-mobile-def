import { REACT_APP_API_URL } from "@env";
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
import MyCropsContext from "../context/CropContext";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import MyFarmsContext from "../context/FarmContext";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";


const ModalAddCrop = ({isModalOpenAddCrop, setIsModalOpenAddCrop}) => {

  const { CreateCrop } = useContext(MyCropsContext);
  const [localError, setLocalError] = useState({"error": false, "message": ""});

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmitAddCrop = async (data) =>{
      data.idFarm = global.idFarm
      const createCropResponse = await CreateCrop(data, data.arbustoCrop);
      if(createCropResponse.data.error == true){
        localError.error = true;
        localError.message = createCropResponse.data.response;
        return;
      }
      //save pdf
      //end
      setLocalError({"error": false, "message": ""});
      reset();
      setIsModalOpenAddCrop(false);
    }
  
    console.log(errors)
    return(

      <ModalModel isModalOpen={isModalOpenAddCrop} setIsModalOpen={setIsModalOpenAddCrop}>
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

        <Text style={tw`text-16px pb-2 pt-1`}>Cantidad de arbustos</Text>
        <InputForm
            control={control}
            name="arbustoCrop"
            placeholder="ej: 1000"
            keyboardType="numeric"
            height={40}
            min={1}
            max={10000}
            pattern={/^[0-9]+$/}
          />
          {errors.arbustoCrop?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.arbustoCrop?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Solo numeros!</Text>
          ) : errors.arbustoCrop?.type === "min" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Minimo 1!</Text>
          ) : errors.arbustoCrop?.type === "max" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Maximo 10000!</Text>
          ) : null}

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
          <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitAddCrop)} color={"#22C55E"}/>
          <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenAddCrop(!setIsModalOpenAddCrop), reset()}} color={"rgba(220, 38, 38, 0.86)"}/>
        </View>
      </ScrollView>
</ModalModel>

    )
}

export default ModalAddCrop