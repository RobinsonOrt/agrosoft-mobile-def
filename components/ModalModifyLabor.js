import global from "../global";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";

import NetInfo from '@react-native-community/netinfo';

import MyLaborsContext from "../context/LaborsContext";

export default function ModalModifyLabor({ isModalOpenModifyLabor, setIsModalOpenModifyLabor }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { labor, UpdateLabor,error, message } = useContext(MyLaborsContext);
  const [localError, setLocalError] = useState(false);
  const [localErrorMsg, setLocalErrorMsg] = useState("");

  useBackHandler(() => {
    navigate("/");
    return true;
  });

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

  const saveLabor = () => {
    console.log(labor);
    //validate if all fields are filled
    if (labor.nameSubRole == null || labor.nameSubRole == "" || labor.nameSubRole.trim().length < 1 || labor.nameSubRole.length > 20) {
      setLocalError(true);
      setLocalErrorMsg("El nombre del cargo debe tener entre 1 y 20 caracteres");
    } else if (labor.descriptionSubRole == null || labor.descriptionSubRole == "" || labor.descriptionSubRole.trim().length < 15 || labor.descriptionSubRole.length > 150) {
      setLocalError(true);
      setLocalErrorMsg("La descripción del cargo debe tener entre 15 y 150 caracteres");
    } else {
      setLocalError(false);
      setLocalErrorMsg("");
      UpdateLabor(labor);
      setIsModalOpenModifyLabor(false);
    }
  }

  return (
    <>
      <Modal visible={isModalOpenModifyLabor} transparent={true} animationType={'fade'}>
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <View style={tw`h-full flex items-center justify-center`}>
              <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
                Modificar cargo
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
                      {message}
                    </Text>
                  ) : null}

                  {localError ? (
                    <Text
                      style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                    >
                      {localErrorMsg}
                    </Text>
                  ) : null}

                  <TextInput
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                    onChange={(e) => labor.nameSubRole = e.nativeEvent.text}
                    defaultValue={labor.nameSubRole}
                    placeholder="Nombre"
                  />
                  <TextInput
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg h-83px w-321px mb-5 border-b border-yellow-700`}
                    onChange={(e) => labor.descriptionSubRole = e.nativeEvent.text}
                    placeholder="Descripción"
                    defaultValue={labor.descriptionSubRole}
                    multiline={true}
                  />

                  <TouchableOpacity
                    style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={saveLabor}
                  >
                    <Text style={tw`text-lg text-white text-center`}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={() => setIsModalOpenModifyLabor(!setIsModalOpenModifyLabor)}
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