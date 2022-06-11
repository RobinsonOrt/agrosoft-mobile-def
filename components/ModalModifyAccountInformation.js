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

import NetInfo from '@react-native-community/netinfo';
import MyUserContext from '../context/UserContext';
import MyIdentifierContext from '../context/IdentifierContext';

export default function ModalModifyAccountInformation({ isModalOpen, setIsModalOpen }) {
  let navigate = useNavigate();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      redirectConnection();
    }
  });

  const { user, ModifyUser, error } = useContext(MyUserContext);
  const { identifiers, actualIdentifier, setActualIdentifier, getIdentifier, setIdentifier } = useContext(MyIdentifierContext);
  const [localError, setLocalError] = useState({status: false, message: ""});

  useBackHandler(() => {
    navigate("/");
    return true;
  });


  const onSubmit = async () => {
    if (actualIdentifier === undefined) {
      setActualIdentifier(user.idIdentifier);
    }
    user.idIdentifier = actualIdentifier;

    var namePattern = /^[a-zA-Z ]+$/;

    if (!namePattern.test(user.name) || user.name == null || user.name == "" || user.name.trim().length < 1 || user.name.length > 50) {
      setLocalError({status: true, message: "El nombre no es válido"});
      return;
    }
    
    if (!namePattern.test(user.lastName) || user.lastName == null || user.lastName == "" || user.lastName.trim().length < 1 || user.lastName.length > 50) {
      setLocalError({status: true, message: "El apellido no es válido"});
      return;
    }

    var phoneNumberPattern = /^[0-9]*$/;
    if (!phoneNumberPattern.test(user.phoneNumber) || user.phoneNumber == null || user.phoneNumber == "" || user.phoneNumber.trim().length < 3 || user.phoneNumber.length > 15) {
      setLocalError({status: true, message: "El número de teléfono no es válido"});
      return;
    }

    setLocalError({status: false, message: ""});
    const userResponse = await ModifyUser(user);
    if(!userResponse.data.error){
      setIsModalOpen(false);
      const identifierResponse = await getIdentifier(actualIdentifier)
      setIdentifier(identifierResponse.data.response);
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
      <Modal visible={isModalOpen} transparent={true} animationType={'fade'}>
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <View style={tw`flex items-center justify-center`}>
              <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
                Administrar perfil
              </Text>
              <ScrollView style={tw`mt-2`}>
                <View style={tw`px-7 mb-10 flex items-center justify-center`}>
                  <Text style={tw` text-black mb-10 w-283px  text-center`}>
                    Rellena los campos con la información correspondiente
                  </Text>
                  {localError.status ? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{localError.message}</Text> : null}
                  {error.status ? <Text style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}>{error.message}</Text> : null}
                  <TextInput
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
                    defaultValue={user.name}
                    onChangeText={text => user.name = text}
                    placeholder="Nombres"
                    

                  />

                  <TextInput
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
                    defaultValue={user.lastName}
                    onChangeText={text => user.lastName = text}
                    placeholder="Apellidos"
                  />
                  <Picker
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
                    itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
                    selectedValue={actualIdentifier}
                    onValueChange={(itemValue) =>
                      setActualIdentifier(itemValue)
                    }>
                    {identifiers.map((item, index) => (
                      <Picker.Item label={"+" + item.identifier + " - " + item.countryName} value={item.idIdentifier} key={index} />
                    ))
                    }

                  </Picker>
                  <TextInput
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
                    placeholder="celular"
                    defaultValue={user.phoneNumber}
                    onChangeText={text => user.phoneNumber = text}
                    keyboardType='numeric'
                  />

                  <TouchableOpacity
                    style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={onSubmit}
                  >
                    <Text style={tw`text-lg text-white text-center`}>Guardar cambios</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={() => setIsModalOpen(!setIsModalOpen)}
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