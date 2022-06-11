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
import MyUserContext from "../context/UserContext";

export default function ModalPasswordRecovery({ isModalOpenPasswordRecovery, setIsModalOpenPasswordRecovery }) {
  const [data, setData] = useState({ oldPassword: "", password1: "", password2: "" });
  const [errorPass1, setErrorPass1] = useState();
  const [errorPass2, setErrorPass2] = useState();
  const [errorLocal, setErrorLocal] = useState();

  const { ChangePassword, response } = useContext(MyUserContext);

  const onSubmit = async () => {
    console.log(data)

    var passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/;
    if (!passwordPattern.test(data.password1)) {
      setErrorPass1("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
    } else {
      setErrorPass1("");
      if (!passwordPattern.test(data.password2)) {
        setErrorPass2("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
      } else {
        setErrorPass2("");
        if (data.password1 !== data.password2) {
          setErrorLocal("Las contraseñas no coinciden");
        } else {
          console.log("llega")
          setErrorLocal("");
          data.idUser = global.idUser;
          const ChangePasswordResponse = await ChangePassword(data);
          if (!ChangePasswordResponse.data.error) {
            setData({ oldPassword: "", password1: "", password2: "" });
            setIsModalOpenPasswordRecovery(false);
          }
        }
      }
    }
  }

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
      <Modal visible={isModalOpenPasswordRecovery} transparent={true} animationType={'fade'} onRequestClose={() => setIsModalOpenPasswordRecovery(false)}>
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <View style={tw`h-full flex items-center justify-center`}>
              <Text style={tw`text-3xl font-bold text-black mt-20 mb-5`}>
                Cambio de contraseña
              </Text>
              <ScrollView style={tw`mt-2`}>
                <View style={tw`px-7 mb-10 flex items-center justify-center`}>
                  <Text style={tw` text-black mb-10 w-283px  text-center`}>
                    Rellena los campos con la información correspondiente
                  </Text>
                  {response.status ? <Text
                    style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                  >
                    {response.message}
                  </Text> : null}
                  <TextInput
                    id="oldpassword"
                    placeholder="Contraseña antigua"
                    onChangeText={text => setData({ ...data, oldPassword: text })}
                    value={data.oldPassword}
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                    pattern={
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
                    }
                    secureTextEntry={true}
                  />
                  {errorPass1 ? <Text style={tw`text-red-500 text-xs`}>{errorPass1}</Text> : null}
                  <TextInput
                    id="password1"
                    placeholder="Nueva contraseña"
                    onChangeText={text => setData({ ...data, password1: text })}
                    defaultValue={data.password1}
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                    pattern={
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
                    }
                    secureTextEntry={true}
                  />
                  {errorPass1 ? <Text style={tw`text-red-500 text-xs`}>{errorPass1}</Text> : null}
                  <TextInput
                    id="password2"
                    placeholder="Confirmar nueva contraseña"
                    onChangeText={text => setData({ ...data, password2: text })}
                    defaultValue={data.password2}
                    style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                    secureTextEntry={true}
                    pattern={
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
                    }
                  />
                  {errorPass2 ? <Text style={tw`text-red-500 text-xs`}>{errorPass2}</Text> : null}
                  {errorLocal ? <Text style={tw`text-red-500 text-xs`}>{error}</Text> : null}


                  <TouchableOpacity
                    style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={onSubmit}
                  >
                    <Text style={tw`text-lg text-white text-center`}>Guardar cambios</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                    onPress={() => setIsModalOpenPasswordRecovery(!setIsModalOpenPasswordRecovery)}
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