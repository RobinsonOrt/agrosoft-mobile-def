import {REACT_APP_API_URL} from '@env'
import global from "../global";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker, 
  Modal
} from "react-native";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import NetInfo from '@react-native-community/netinfo';
import { styles } from './ModalStyles';

export default function ModalAddEmployee({isModalOpenAddEmployee, setIsModalOpenAddEmployee}){
    let navigate = useNavigate();

    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected){
        redirectConnection();
      }
    });
    
    const [result, setResult] = useState();
    const [error, setError] = useState(false);
    const [identifiers, setIdentifiers] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();
    // const [value, setValue] = useState();
  
    
  
    const loadIdentiiers = async () => {
      const urlIdentifiers = REACT_APP_API_URL + "/api/identifiers";
      axios.get(urlIdentifiers).then(response => {
        setIdentifiers(response.data);
      })
    }
  
    useBackHandler(() => {
      navigate("/");
      return true;
    });
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const Input = ({
      style,
      fieldValue,
      placeholder,
      keyboardType,
      secureTextEntry,
      pattern,
      autoCapitalize,
      minLength,
      maxLength,
      multiline,
    }) => {
      return (
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: pattern,
            minLength: minLength,
            maxLength: maxLength,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={style}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
              
            />
          )}
          name={fieldValue}
        />
      );
    };
  
    const onSubmit = async (data) => {
      data.idIdentifier = selectedLanguage
      await axios
        .post(REACT_APP_API_URL + "/api/register", data)
        .then((res) => setResult(res));
    };
  
    useEffect(() => {
      loadIdentiiers()
      if (result?.data.error === true) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
  
      if (result?.data.error === false) {
        navigate("/tokenValidation");
      }
    }, [result]);


    return(
        <>
            <Modal visible={isModalOpenAddEmployee} transparent={true} animationType={'fade'}>
                <View style={styles.modalContainerStyle}>
                    <View style={styles.modalStyle}>                  
                <View style={tw`h-full flex items-center justify-center`}>
      <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
        Agregar nueva finca
      </Text>
      <ScrollView style={tw`mt-2`}>
        <View style={tw`px-7 mb-10 flex items-center justify-center`}>
          <Text style={tw` text-black mb-10 w-283px  text-center`}>
            Rellena los campos con la información correspondiente
          </Text>
          {error ? (
            <Text
              style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
            >
              {result.data.response}
            </Text>
          ) : null}
          <Input
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
            fieldValue="name"
            placeholder="Nombre"
            autoCapitalize="words"
            pattern={/^[a-zA-Z]{1,50}$/}
          />
          {errors.name && (
            <Text style={tw`text-red-600 mb-5`}>Campo requerido, maximo 50 caracteres!</Text>
          )}
          <Input
            style={tw`bg-slate-50 px-5 py-3 rounded-lg h-83px w-321px mb-5 border-b border-yellow-700`}
            fieldValue="description"
            placeholder="Descripción"
            autoCapitalize="words"
            pattern={/^[a-zA-Z]{15,100}$/}
            multiline={true}
          />
          {errors.description && (
            <Text style={tw`text-red-600 mb-5 w-65`}>Campo requerido , minimo 15 caracteres y maximo 50 caracteres</Text>
          )}
  
        
          <TouchableOpacity
            style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-lg text-white text-center`}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
            onPress={() => setIsModalOpenAddEmployee(!setIsModalOpenAddEmployee)}
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