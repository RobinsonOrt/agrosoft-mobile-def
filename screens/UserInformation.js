import global from "../global";
import React, { useState, useEffect, useRef, useContext } from "react";
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
import SubHeader2 from "../components/SubHeader2"
import PhoneInput from 'react-native-phone-number-input';
import InputForm from "../components/InputForm";
import ModalButton from "../components/ModalButton";
import { useForm } from "react-hook-form";


export default function UserInformation( {navigation} ) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPasswordRecovery, setIsModalOpenPasswordRecovery] = useState(false);
  const [isModalOpenAccountDelete, setIsModalOpenAccountDelete] = useState(false); 
  const [isModalOpenModifyEmail, setIsModalOpenModifyEmail] = useState(false);

  const { LoadUser, user } = useContext(MyUserContext);
  const { getIdentifier, identifier, setIdentifier, LoadIdentifiers, actualCountryCode, setActualIdentifier} = useContext(MyIdentifierContext);

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
  const phoneInput = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLanguagee, setSelectedLanguagee] = useState(null);
  const [country, setCountry] = useState(identifier.countryCode)

  useBackHandler(() => {
    navigation.navigate("Mis fincas")
    return true;
  })

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm();

  useEffect(async() => {
    await LoadIdentifiers();
    const userResponse = await LoadUser(global.idUser);
    const identifierResponse = await getIdentifier(userResponse.data.response.idIdentifier)
    setIdentifier(identifierResponse.data.response);
  }, []);

  useEffect( async ()  =>{
    await LoadIdentifiers()
  },[identifier])

  useEffect(() => {
    reset({
      name: user.name,
      lastName: user.lastName,
      email: user.email
    });
    setActualIdentifier(user.idIdentifier)
      
  }, [user]);

  return (
  
      <View style={tw`h-full flex items-center justify-center`}>
       <SubHeader2 title="Administrar Perfil"/> 
      <ModalModifyAccountInformation isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} navigation={navigation}/>
      <ScrollView style={tw`mt-7`}>
      <InputForm
            control={control}
            name="name"
            placeholder="Nombres"
            autoCapitalize="words"
            autoFocus={true}
            minLength={1}
            maxLength={50}
            height={40}
            pattern={/^[a-zA-Z ]+$/}
            editable={false}
          />
        <InputForm
            control={control}
            name="lastName"

            placeholder="Apellidos"
            autoCapitalize="words"
            minLength={1}
            maxLength={50}
            height={40}
            pattern={/^[a-zA-Z ]+$/}
            editable={false}
          />
        <View style={tw`flex-row w-80 p-0`}>
        <View style={[tw`items-center mb-5 bg-white flex-row w-full rounded-lg border `, {borderColor: 'rgba(120, 212, 63, 1)'}]}>
        <TextInput
            style={[tw`bg-white px-2 rounded-7px  h-40px`, {borderColor: 'rgba(120, 212, 63, 1)'}]}
            value={"+" + identifier.identifier}
            editable={false}
            />  
          <TextInput
            style={[tw`bg-white grow px-2 rounded-7px h-40px`, {borderColor: 'rgba(120, 212, 63, 1)'}]}
            value={user.phoneNumber}
            editable={false}
          /> 
          </View>
          </View>
        
            <InputForm
              control={control}
              name="email"
              height={40}
              editable={false}
            />
          <View style={tw`items-center mb-5 justify-center`}>

          
          <ModalModifyEmail isModalOpenModifyEmail={isModalOpenModifyEmail} setIsModalOpenModifyEmail={setIsModalOpenModifyEmail}/>  



         <ModalPasswordRecovery isModalOpenPasswordRecovery={isModalOpenPasswordRecovery} setIsModalOpenPasswordRecovery={setIsModalOpenPasswordRecovery}/>
          
         
          <ModalAccountDelete navigation={navigation} isModalOpenAccountDelete={isModalOpenAccountDelete} setIsModalOpenAccountDelete={setIsModalOpenAccountDelete}/>
          </View>
          <View style={[tw`w-full pt-10 px-10 border-t`,{borderColor:'rgba(156, 163, 175, 1)'}]}>
          <ModalButton text={"Editar información"} onPress={()=>setIsModalOpen(!isModalOpen)} color={"rgba(248, 189, 35, 0.85)"} />
          <ModalButton text={"Cambiar correo"} onPress={()=>setIsModalOpenModifyEmail(!isModalOpenModifyEmail)} color={"rgba(34, 158, 197, 1)"} />
          <ModalButton text={"Cambiar contraseña"} onPress={()=>setIsModalOpenPasswordRecovery(!isModalOpenPasswordRecovery)} color={"#22C55E"} />
          <ModalButton text={"Eliminar cuenta"} onPress={()=>setIsModalOpenAccountDelete(!isModalOpenAccountDelete)} color={"rgba(239, 68, 68, 1)"} />

                      

          </View>
          
      </ScrollView> 
      


        
      </View>
    
  );
}