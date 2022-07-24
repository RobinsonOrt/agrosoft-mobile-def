import global from "../global";
import React, { useState, useContext } from "react";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import Checkbox from "expo-checkbox";
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
  const [isChecked0, setChecked0] = useState(false);
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const { ChangePassword, response } = useContext(MyUserContext);

  const onSubmit = async () => {
    if (data.oldPassword == "") {
      setErrorLocal("Debe ingresar la contraseña actual");
      return;
    }
    setErrorLocal("");
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
          setErrorLocal("");
          data.idUser = global.idUser;
          const ChangePasswordResponse = await ChangePassword(data);
          if (!ChangePasswordResponse.data.error) {
            setData({ oldPassword: "", password1: "", password2: "" });
            setChecked0(false);
            setChecked1(false);
            setChecked2(false);
            setIsModalOpenPasswordRecovery(false);
          }
        }
      }
    }
  }

  return (
    <>
      <ModalModel isModalOpen={isModalOpenPasswordRecovery} setIsModalOpen={setIsModalOpenPasswordRecovery}>
        <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
          Cambio de contraseña
        </Text>
        <View style={tw` flex items-center justify-center w-90%`}>
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
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-full mb-1 border border-gray-500`}
            pattern={
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
            }
            secureTextEntry={!isChecked0}
          />
          <View style={tw`flex-row mb-5`}>
            <Checkbox style={tw`rounded-xl`} value={isChecked0} onValueChange={setChecked0} />
            <Text style={tw`text-base text-black ml-3`}>
              Mostrar contraseña
            </Text>
          </View>
          {errorPass1 ? <Text style={tw`text-red-500 text-xs `}>{errorPass1}</Text> : null}
          <TextInput
            id="password1"
            placeholder="Nueva contraseña"
            onChangeText={text => setData({ ...data, password1: text })}
            defaultValue={data.password1}
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-full border mb-1 border-gray-500`}
            pattern={
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
            }
            secureTextEntry={!isChecked1}
          />
          <View style={tw`flex-row mb-5`}>
            <Checkbox style={tw`rounded-xl`} value={isChecked1} onValueChange={setChecked1} />
            <Text style={tw`text-base text-black ml-3`}>
              Mostrar contraseña
            </Text>
          </View>
          {errorPass2 ? <Text style={tw`text-red-500 text-xs`}>{errorPass2}</Text> : null}
          <TextInput
            id="password2"
            placeholder="Confirmar nueva contraseña"
            onChangeText={text => setData({ ...data, password2: text })}
            defaultValue={data.password2}
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-full border mb-1 border-gray-500`}
            secureTextEntry={!isChecked2}
            pattern={
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
            }
          />
          <View style={tw`flex-row mb-5`}>
            <Checkbox style={tw`rounded-xl`} value={isChecked2} onValueChange={setChecked2} />
            <Text style={tw`text-base text-black ml-3`}>
              Mostrar contraseña
            </Text>
          </View>

          {errorLocal ? <Text style={tw`text-red-500 text-15px mb-3`}>{errorLocal}</Text> : null}
          <ModalButton text={"Confirmar"} onPress={() => { onSubmit() }} color={"rgba(34, 197, 94, 1)"} />
          <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenPasswordRecovery(!setIsModalOpenPasswordRecovery),
            setErrorLocal(""),
            setErrorPass1(""),
            setErrorPass2(""),
            setData({ oldPassword: "", password1: "", password2: "" }),
            response.status = false,
            setChecked0(false),
            setChecked1(false),
            setChecked2(false)}}
            color={"rgba(255, 0, 0, 1)"} />
        </View>
      </ModalModel>
    </>
  )
}