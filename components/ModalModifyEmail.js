import { REACT_APP_API_URL } from '@env'
import global from "../global";
import React, { useState, useContext } from "react";
import { useBackHandler } from "@react-native-community/hooks";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import Checkbox from "expo-checkbox";
import {
    View,
    Text,
    LayoutAnimation,
    StyleSheet,
    Modal,
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native";
import tw from "twrnc";
import MyUserContext from '../context/UserContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-native";
export default function ModalModifyEmail({ isModalOpenModifyEmail, setIsModalOpenModifyEmail }) {
    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);
    const [isOpenn, setIsOpenn] = useState(false);
    const [data, setData] = useState({ password: "", email: "" });
    const [error, setError] = useState({ status: false, message: "" });
    const [isChecked0, setChecked0] = useState(false);

    const { ComparePassword, ModifyEmail } = useContext(MyUserContext);
    const { LogOut } = useContext(AuthContext);

    const toggleOpen = () => {
        setIsOpen(false)
        setIsOpenn(true)
    }


    const submitPassword = async () => {
        data.idUser = global.idUser;

        const responseCompare = await ComparePassword(data)

        if (!responseCompare.data.error) {
            setError({ status: false, message: "" });
            setChecked0(false);
            toggleOpen();
            return;
        }
        setError({ status: true, message: responseCompare.data.response });
    }

    const submitEmail = async () => {
        var emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.email.match(emailPattern)) {
            setError({ status: false, message: "" });
            data.tokenUser = global.tokenChange;

            const responseEmail = await ModifyEmail(data);
            if (!responseEmail.data.error) {
                setIsModalOpenModifyEmail(false);
                logOut();
            }
            setError({ status: true, message: responseCompare.data.response });
        } else {
            setError({ status: true, message: "Email inválido" })
        }
    }

    const logOut = () => {
        LogOut();
        navigate("/login");
        return false;
    }

    const cancelEmailChange = () => {
        setError({ status: false, message: "" });
        setData({ password: "", email: "" });
        setIsOpen(true);
        setIsOpenn(false);
        setIsModalOpenModifyEmail(false);
    }


    return (
        <ModalModel isModalOpen={isModalOpenModifyEmail} setIsModalOpen={setIsModalOpenModifyEmail} >
            <View style={tw`flex items-center justify-center`}>
                <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>Editar correo</Text>
                <View style={tw`flex items-center justify-center`}>
                    <Text style={tw`text-black mb-10 w-283px  text-center`}>
                        Rellena los campos con la información correspondiente. Recuerde que al cambiar su correo debera activar su cuenta antes de poder iniciar sesión.
                    </Text>
                    <View style={[styles.list, !isOpen ? [styles.hidden, tw`w-full items-center`] : undefined]}>
                        <View style={tw`items-center`}>
                            {error.status ? <Text style={tw`text-red-500 text-center `}>{error.message}</Text> : null}
                            <TextInput
                                id="password"
                                placeholder="Contraseña"
                                value={data.password}
                                onChangeText={text => setData({ ...data, password: text })}
                                style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border border-green-500`}
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

                            <ModalButton text={"Confirmar"} onPress={() => { submitPassword() }} color={"rgba(34, 197, 94, 1)"} />
                            <ModalButton text={"Cancelar"} onPress={() => { setError({ status: false, message: "" }), setData({ password: "", email: "" }), setIsModalOpenModifyEmail(!setIsModalOpenModifyEmail), setChecked0(false) }} color={"rgba(255, 0, 0, 1)"} />
                        </View>
                    </View>

                    <View style={[styles.list, !isOpenn ? [styles.hidden, tw`w-full items-center`] : undefined]}>
                        {error.status ? <Text style={tw`text-red-500 text-center`}>{error.message}</Text> : null}
                        <TextInput
                            id="newEmail"
                            value={data.email}
                            onChangeText={text => setData({ ...data, email: text })}
                            placeholder="Nuevo correo"
                            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border border-green-500`}
                            autoCapitalize="none"

                        />
                        <View style={tw`items-center`}>
                            <ModalButton text={"Confirmar"} onPress={() => { submitEmail() }} color={"rgba(34, 197, 94, 1)"} />
                            <ModalButton text={"Cancelar"} onPress={() => { cancelEmailChange() }} color={"rgba(255, 0, 0, 1)"} />
                        </View>
                    </View>
                </View>
            </View>
        </ModalModel>
    )
}

const styles = StyleSheet.create({
    hidden: {
        height: 0,
    },
    list: {
        overflow: 'hidden'
    },
})