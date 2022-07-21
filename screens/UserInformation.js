import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { Navigator, BackAndroid} from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import tw from "twrnc";
import { View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Picker} 
  from "react-native";
import Logo from "../assets/alert6.png";
import NetInfo from '@react-native-community/netinfo';
import ModalModifyAccountInformation from "../components/ModalModifyAccountInformation";
import ModalPasswordRecovery from "../components/ModalPasswordRecovery";
import ModalAccountDelete from "../components/ModalAccountDelete";
import ModalModifyEmail from "../components/ModalModifyEmail";
import MyUserContext from "../context/UserContext";
import MyIdentifierContext from "../context/IdentifierContext";


export default function UserInformation( {navigation} ) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPasswordRecovery, setIsModalOpenPasswordRecovery] = useState(false);
  const [isModalOpenAccountDelete, setIsModalOpenAccountDelete] = useState(false); 
  const [isModalOpenModifyEmail, setIsModalOpenModifyEmail] = useState(false);

  const { LoadUser, user } = useContext(MyUserContext);
  const { getIdentifier, identifier, setIdentifier, LoadIdentifiers} = useContext(MyIdentifierContext);

  useBackHandler(() => {
    navigation.navigate("Mis fincas")
    return true;
  })

  useEffect(async() => {
    LoadIdentifiers();
    const userResponse = await LoadUser(global.idUser);
    const identifierResponse = await getIdentifier(userResponse.data.response.idIdentifier)
    setIdentifier(identifierResponse.data.response);
  }, []);
  return (
  
      <View style={tw`h-full flex items-center justify-center`}>
      <Text style={tw`text-3xl  font-bold text-black mb-5 mt-15`}>
        Administrar perfil <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}><Image source={Logo} style={tw`h-32px w-35px p-0 m-0`}/></TouchableOpacity>
        
      </Text>
      <ModalModifyAccountInformation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <ScrollView style={tw`mt-7`}>
        <TextInput
              style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
              value={user.name}
              placeholder="Nombres"
              editable={false}
        />
        <TextInput
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
            value={user.lastName}
            placeholder="Apellidos"
            editable= {false}
          />
        <View style={tw`flex-row w-80 p-0`}>
        <TextInput
            style={tw`bg-slate-50 text-base py-3 rounded-lg w-55px mb-5 pl-0 pr-0 border-b border-yellow-700`}
            value={"+" + identifier.identifier}
            placeholder="identificador"
            editable={false}
          />  
          <TextInput
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
            placeholder="celular"
            value={user.phoneNumber}
            editable={false}
          /> 
          </View>
        <TextInput
            style={tw`bg-slate-50 px-5 py-3 rounded-lg w-321px mb-5 border-b-2 border-yellow-500`}
            value={user.email}
            placeholder="correo"
            editable={false}
          />
          <View style={tw`items-center justify-center`}>

          <TouchableOpacity onPress={() => setIsModalOpenModifyEmail(!isModalOpenModifyEmail)} underlayColor="#ddddd" activeOpacity={0.6}>
            <Text
              style={tw`bg-red-500 text-lg mb-3 text-white px-5 py-3 w-215px rounded-lg text-center`}
            >
              Cambiar correo
            </Text>
          </TouchableOpacity>
          <ModalModifyEmail isModalOpenModifyEmail={isModalOpenModifyEmail} setIsModalOpenModifyEmail={setIsModalOpenModifyEmail}/>  

          <TouchableOpacity onPress={() => setIsModalOpenPasswordRecovery(!isModalOpenPasswordRecovery)} underlayColor="#ddddd" activeOpacity={0.6}>
            <Text
              style={tw`bg-yellow-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
            >
              Cambiar contraseña
            </Text>
         </TouchableOpacity>

         <ModalPasswordRecovery isModalOpenPasswordRecovery={isModalOpenPasswordRecovery} setIsModalOpenPasswordRecovery={setIsModalOpenPasswordRecovery}/>
          
         <TouchableOpacity onPress={() => setIsModalOpenAccountDelete(!isModalOpenAccountDelete)} underlayColor="#ddddd" activeOpacity={0.6}>
            <Text
              style={tw`bg-red-500 text-lg text-white px-5 py-3 w-215px rounded-lg text-center`}
            >
              Eliminar cuenta
            </Text>
            
          </TouchableOpacity>
          <ModalAccountDelete isModalOpenAccountDelete={isModalOpenAccountDelete} setIsModalOpenAccountDelete={setIsModalOpenAccountDelete}/>
          </View>
      </ScrollView> 


        
      </View>
    
  );
}