import { REACT_APP_API_URL } from '@env'
import global from "../global";
import React, { useState, useContext } from "react";
import { useBackHandler } from "@react-native-community/hooks";
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

    const { response, ComparePassword, ModifyEmail } = useContext(MyUserContext);
    const { LogOut } = useContext(AuthContext);

    const toggleOpen = () => {
        setIsOpen(false)
        setIsOpenn(true)
    }


    const submitPassword = async () => {
        data.idUser = global.idUser;

        const responseCompare = await ComparePassword(data)

        if (!responseCompare.data.error) {
            toggleOpen();
        }
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
        setIsOpen(true);
        setIsOpenn(false);
        setIsModalOpenModifyEmail(false);
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
            <Modal visible={isModalOpenModifyEmail} transparent={true} animationType={'fade'} onRequestClose={() => cancelEmailChange()}>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}>
                        <View style={tw`flex items-center justify-center`}>
                            <Text style={tw`text-3xl font-bold text-black  mt-20 mb-5`}>Editar correo</Text>
                            <ScrollView style={tw`mt-2`}>
                                <View style={tw`flex items-center justify-center`}>
                                    <Text style={tw`text-black mb-10 w-283px  text-center`}>
                                        Rellena los campos con la información correspondiente
                                    </Text>
                                    <View style={[styles.list, !isOpen ? [styles.hidden, tw`w-full items-center`] : undefined]}>
                                        <View style={tw`w-full justify-center items-center`}>
                                            {response.status ? <Text style={tw`text-red-500 text-center `}>{response.message}</Text> : null}
                                            <TextInput
                                                id="password"
                                                placeholder="Contraseña"
                                                value={data.password}
                                                onChangeText={text => setData({ ...data, password: text })}
                                                style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                                                pattern={
                                                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!.@$%^&*-]).{8,24}$/
                                                }
                                                secureTextEntry={true}
                                            />

                                            <TouchableOpacity
                                                style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                                onPress={submitPassword}
                                            >
                                                <Text style={tw`text-lg text-white text-center`}>Confirmar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                                onPress={() => setIsModalOpenModifyEmail(!setIsModalOpenModifyEmail)}
                                            >
                                                <Text style={tw`text-lg text-white text-center`}>Cancelar </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={[styles.list, !isOpenn ? [styles.hidden, tw`w-full items-center`] : undefined]}>
                                        {error.status ? <Text style={tw`text-red-500 text-center`}>{error.message}</Text> : null}
                                        {response.status ? <Text style={tw`text-red-500 text-center`}>{response.message}</Text> : null}
                                        <TextInput
                                            id="newEmail"
                                            value={data.email}
                                            onChangeText={text => setData({ ...data, email: text })}
                                            placeholder="Nuevo correo"
                                            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b border-yellow-700`}
                                            autoCapitalize="none"

                                        />
                                        <View style={tw`w-full items-center`}>
                                            <TouchableOpacity
                                                style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                                onPress={() => submitEmail()}
                                            >
                                                <Text style={tw`text-lg text-white text-center`}>Confirmar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                                                onPress={() => cancelEmailChange()}
                                            >
                                                <Text style={tw`text-lg text-white text-center`}>Cancelar</Text>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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