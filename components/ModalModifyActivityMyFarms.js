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
import MyActivitiesContext from "../context/ActivityContext";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";
import PickerModel from "./PickerModel";

const ModalModifyActivityMyFarms = ({isModalOpenModifyActivityMyFarms, setIsModalOpenModifyActivityMyFarms}) => {

  const { UpdateActivity, activity } = useContext(MyActivitiesContext);
  const [localError, setLocalError] = useState({"error": false, "message": ""});
  const [activityType, setActivityType] = useState(null);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmitModifyActivityMyFarm = async (data) =>{
      if (activityType == null || activityType == ""){
        setLocalError({"error":true, "message": "No ha seleccionado un tipo de actividad"})
        return
      }else{
        data.idActivityType = activityType
      }

      data.idActivity = activity.idActivity
      data.idFarm = global.idFarm
      
      
      const updateActivityResponse = await UpdateActivity(data);
      if(updateActivityResponse.data.error == true){
        localError.error = true;
        localError.message = updateActivityResponse.data.response;
        return;
      }
      //save pdf
      //end
      setActivityType(null)
      setLocalError({"error": false, "message": ""});
      reset();
      setIsModalOpenModifyActivityMyFarms(false);
    }

    //useEffect to change whit Activity
    useEffect(() => {
        reset({
          nameActivity: activity.nameActivity,
          descriptionActivity: activity.descriptionActivity,
        });
        setActivityType(activity.idActivityType)
      }, [activity]);
  
    console.log(errors)
    return(

      <ModalModel isModalOpen={isModalOpenModifyActivityMyFarms} setIsModalOpen={setIsModalOpenModifyActivityMyFarms} >
      <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
        Agregar Actividad
      </Text>
      <ScrollView style={tw`mt-2 h-107 w-full mb-5 pb-3`}>
        <View style={tw`w-full px-7`}>
        <Text style={tw`text-16px pb-2 pt-1`}>Nombre de la actividad</Text>
        <InputForm
            control={control}
            name="nameActivity"
            placeholder="Nombre"
            autoCapitalize="words"
            maxLength={20}
            minLength={5}
            autoFocus={true}
            height={40}
            pattern={/^[a-zA-Z ]+$/}
          />
          {errors.nameActivity?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.nameActivity?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Solo caracteres de la a - z!
            </Text>
          ) : errors.nameActivity?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Minimo 5 caracteres!
            </Text>
          ): null  }

        <Text style={tw`text-16px pb-2 pt-1`}>Descripción del cultivo</Text>
        <InputForm
            control={control}
            name="descriptionActivity"
            placeholder="Descripcion"
            autoCapitalize="sentences"
            height={80}
            maxLength={100}
            minLength={15}
            multiline={true}
            pattern={/^[a-zA-ZÁ-ÿ0-9., ]+$/}
          />
          {errors.descriptionActivity?.type === "required" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>Campo requerido!</Text>
          ) : errors.descriptionActivity?.type === "pattern" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              No se permiten caracteres especiales!
            </Text>
          ) : errors.descriptionActivity?.type === "minLength" ? (
            <Text style={tw`text-red-600 mb-2 text-center`}>
              Minimo 15 caracteres!
            </Text>
          ): null  }

          <PickerModel list={[{"typeActivity":"Arbusto", "value":"1"},
                              {"typeActivity":"Cultivo", "value":"2"}]}
                       label="typeActivity"
                       value="value"
                       text="Tipo de actividad"   
                       setSelected={setActivityType}
                       selected={activityType}/>
          {localError.error ? (
                    <Text style={tw`text-red-600 mb-2 text-center`}>
                      {localError.message}
                    </Text>
                  ) : null} 
          <ModalButton text={"Confirmar"} onPress={handleSubmit(onSubmitModifyActivityMyFarm)} color={"#22C55E"}/>
          <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenModifyActivityMyFarms(!setIsModalOpenModifyActivityMyFarms), reset()}} color={"rgba(220, 38, 38, 0.86)"}/>
        </View>
      </ScrollView>
</ModalModel>

    )
}

export default ModalModifyActivityMyFarms