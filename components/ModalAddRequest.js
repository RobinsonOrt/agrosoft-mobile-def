import { REACT_APP_API_URL } from '@env'
import global from "../global";
import React, { useState, useEffect, useContext } from "react";
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
import MyFarmsContext from "../context/FarmContext";
import MyRequestsMyFarmsContext from "../context/RequestsMyFarmsContext";
import { RadioButton } from "react-native-paper";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";
import PickerModel from "./PickerModel";


export default function ModalAddRequest({ isModalOpenAddRequest, setIsModalOpenAddRequest }) {
    let navigate = useNavigate();

    const [email, setEmail] = useState();
    const [idFarm, setIdFarm] = useState("0");
    const [role, setRole] = useState("2");
    const [localError, setLocalError] = useState();
    const [localMessage, setLocalMessage] = useState();

    const { allFarms } = useContext(MyFarmsContext);
    const { CreateRequest, error2, message, setError2, setMessage } = useContext(MyRequestsMyFarmsContext);


    useBackHandler(() => {
        navigate("/");
        return true;
    });


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    const onSubmitAddRequest = async () => {
        setError2(false);
        setLocalError(false)
        if(idFarm === "0"){
            setLocalError(true);
            setLocalMessage("Porfavor seleccione una granja");
            return;
        }

        const responseCreateRequest = await CreateRequest(email, idFarm, role);  
        setError2(responseCreateRequest.data.error);
        setMessage(responseCreateRequest.data.response);
        
        if(responseCreateRequest.data.error === false){
            setLocalError(false);
            setEmail("");
            setIdFarm("0");
            setIsModalOpenAddRequest(false);
        }   
    };

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
    return (
        <>
            <Modal visible={isModalOpenAddRequest} transparent={true} animationType={'fade'} onRequestClose={() => setIsModalOpenAddRequest(false)}>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}>
                        <View style={tw`h-full flex items-center justify-center`}>
                            <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
                                Crear nueva solicitud
                            </Text>
                            <ScrollView style={tw`mt-2`}>
                                <View style={tw`flex items-center justify-center`}>
                                    <Text style={tw` text-black mb-10 w-283px  text-center`}>
                                        Rellena los campos con la información correspondiente
                                    </Text>
                                    {error2? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{message}</Text>: null}
                                    {localError? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{localMessage}</Text>: null}
                                    
                                    <TextInput
                                        style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                                        defaultValue={email}
                                        onChangeText={text => setEmail(text)}
                                        placeholder="email"
                                    />

                                    <Picker
                                        style={tw`bg-slate-50 text-base px-5 py-3 rounded-lg w-80 mb-5 pl-0 pr-0 border-b border-yellow-700`}
                                        itemStyle={{ backgroundColor: "yellow", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                                        selectedValue={idFarm}
                                        onValueChange={(itemValue) =>
                                            setIdFarm(itemValue)
                                        }>
                                        <Picker.Item label={"Seleccionar Granja"} value={"0"} /> 
                                        {allFarms.map((item, index) => {
                                            return (<Picker.Item label={item.nameFarm} value={item.idFarm} key={index} />)
                                        })
                                        }
                                    </Picker>

                                    <PickerModel list={ allFarms }
                                                label="nameFarm"
                                                value="idFarm"
                                                text="Seleccionar Granja"
                                                setSelected={setIdFarm} />
                                            {localError.error ? (
                                                <Text style={tw`text-red-600 mb-2 text-center`}>
                                                {localError.message}
                                                </Text>
                                            ) : null}


                                    <View style={tw`flex-row`}>
                                        <View style={tw`w-1/2 pr-4 flex-row`}>
                                            <RadioButton
                                                value="1"
                                                status={role === '1' ? 'checked' : 'unchecked'}
                                                onPress={() => setRole('1')}
                                            />
                                            <Text style={tw`text-black `}>Administrador</Text>
                                        </View>
                                        <View style={tw`w-1/2 pl-4 flex-row`}>
                                            <RadioButton
                                                value="2"
                                                status={role === '2' ? 'checked' : 'unchecked'}
                                                onPress={() => setRole('2')}
                                            />
                                                <Text style={tw`text-black`}>Empleado</Text>
                                        </View>
                                    </View>


                                    <TouchableOpacity
                                        style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                        onPress={() => {onSubmitAddRequest()}}
                                    >
                                        <Text style={tw`text-lg text-white text-center`}>Enviar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                        onPress={() => {setLocalError(false), setError2(false), setEmail(""), setIdFarm("0"), setIsModalOpenAddRequest(!setIsModalOpenAddRequest) }}
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
