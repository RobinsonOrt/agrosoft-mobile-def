import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import tw from "twrnc";
import { RequestTable1 } from "../components/RequestTable1";
import { useBackHandler } from "@react-native-community/hooks";
import ModalAddRequest from "../components/ModalAddRequest";
import MyRequestsMyFarmsContext from "../context/RequestsMyFarmsContext";
import MyFarmsContext from "../context/FarmContext";
import SubHeader from "../components/SubHeader"
import SubHeader3 from "../components/SubHeader3";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MyRequestsOtherFarmsContext from "../context/RequestsOtherFarmsContext";



export default function RequestsOtherFarms({ navigation }) {

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas")
    return true;
  })

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenn, setIsOpenn] = useState(false);
  

 const { otherRequests, LoadOtherRequests, AcceptRequest, RejectRequest } = useContext(MyRequestsOtherFarmsContext);

  const DropDown = ({options, AcceptRequest, RejectRequest, name, idRequest}) =>{
    const [isOpen1, setIsOpen1] = useState(false);
    const toggleOpen1 = () => {
      setIsOpen1(value => !value);
    }

    return(
      <>
        <View style={tw`items-center mb-1 px-2`}>
          
            <View style={[tw` h-42px items-center border-b justify-center w-full`, {borderColor:"rgba(81, 212, 0, 0.2)"}]}>
            <TouchableOpacity style={tw`items-center flex-row`} onPress={()=> toggleOpen1()}>
            <Text style={tw`uppercase text-14px`}>{name}</Text>
              {isOpen1 ? <MaterialIcons name="keyboard-arrow-down" size={30} color="black" /> : <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />}
            </TouchableOpacity>
            </View>
            <View style={`w-full `}>
		        <View style={[styles.list, !isOpen1  ? styles.hidden : undefined]}>
          		{options}
        	  </View>
            </View>
            <View style={[tw`w-full  h-42px px-7 items-center flex-row border-b-2 justify-center`, {borderColor:"rgba(81, 212, 0, 0.2)"}]}>
            <TouchableOpacity style={[tw`items-center flex-row h-31px px-3 rounded-xl mr-3`, {backgroundColor:"rgba(34, 197, 94, 1)"}]} onPress={()=>AcceptRequest(idRequest)}><Text style={tw`text-white text-center grow font-bold uppercase text-12px mr-1`}>Aceptar</Text><AntDesign name="checkcircleo" size={22} color="white" /></TouchableOpacity>
	    <TouchableOpacity style={[tw`items-center flex-row h-31px px-3 rounded-xl ml-3`, {backgroundColor:"rgba(239, 68, 68, 1)"}]} onPress={()=>RejectRequest(idRequest)}><Text style={tw`text-white text-center grow font-bold uppercase text-12px mr-1`}>Cancelar</Text><Feather name="x-circle" size={22} color="white" /></TouchableOpacity>	
            </View>
          </View>
      
      </>
    )

  }
  const DropDown2 = ({options, state, name}) =>{
    const [isOpen1, setIsOpen1] = useState(false);
    const toggleOpen1 = () => {
      setIsOpen1(value => !value);
    }

    return(
      <>
        <View style={tw`h-78px items-center flex-row px-2 `}>
            <View style={[tw`flex-row items-center h-full border-r justify-center w-50%`,{borderColor:"rgba(32, 84, 0, 0.15)"}]}>
            
            <TouchableOpacity style={tw`items-center flex-row`} onPress={()=> toggleOpen1()}>
            <Text style={tw`uppercase text-14px`}>{name}</Text>
              {isOpen1 ? <MaterialIcons name="keyboard-arrow-down" size={30} color="black" /> : <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />}
            </TouchableOpacity>
            </View>
            <View style={[tw`w-50% px-7 border-l h-full items-center flex-row`,{borderColor:"rgba(32, 84, 0, 0.15)"}]}>
              <Text style={[tw`text-16px text-center grow uppercase font-bold`, state==="Pendiente"?{color:"rgba(234, 179, 8, 1)"}:state==="Aceptada"?{color:"rgba(21, 128, 61, 1)"}:{color:"#EF4444"}]}>
                {state}
              </Text>
                
            </View>
          </View>
 
        <View style={[styles.list, !isOpen1  ? styles.hidden : undefined]}>
          {options}
        </View>
      
      
      </>
    )

  }

  const incoming = (
    otherRequests.length > 0 ? (
    otherRequests.map((request, index) => {
      console.log(request)
      return (

        <DropDown key={index} options={
        
          
        <View style={[tw`w-full rounded-b items-center mb-1 flex-row  pt-2 border-t`, {borderColor:"rgba(81, 212, 0, 0.2)", backgroundColor:"rgba(32, 84, 0, 0.15)"}]} >
        
          <View style={tw`w-1/2 items-center`}>
            <Text style={tw`text-center font-bold`}>Tipo: {request.typeRequest}</Text>
          
          <View style={tw`items-center`}>
            <Text>{request.createdDate.split("T")[0]}</Text>
          </View>
          <View style={tw`items-center`}>
            <Text >{request.email}</Text>
          </View>
          </View>
          <View style={tw`w-1/2 items-center`}>
          
          <Text style={tw`font-semibold uppercase text-13px text-center`}>Finca:{"\n"}{request.nameFarm}</Text>
          <Text style={tw`font-semibold text-14px text-center`}>{request.descriptionFarm}</Text>
            
          </View>
        </View>
        } AcceptRequest={AcceptRequest} RejectRequest={RejectRequest} idRequest={request.idRequest}
        name={request.name}/>
        
        
      
        
      )
    })): (<Text style={tw`text-center text-gray-500`}>No hay solicitudes entrantes</Text>)
  )

  const registers = (
    otherRequests.length > 0 ? (
    otherRequests.map((request, index) => {
      return (
        <DropDown2 key={index} name={request.name} state={request.stateRequest} options={
          <View style={tw`w-full `}>
            
          <View style={[tw`w-full items-center h-60px flex-row  pt-2 border-t`, {borderColor:"rgba(81, 212, 0, 0.2)"}]} key={index}>
          
            <View style={tw`w-1/2 items-center`}>
              <Text style={tw`text-center font-bold mb-2`}>Tipo: {request.typeRequest}</Text>
            
            <View style={tw`items-center`}>
              <Text>Enviada: {request.createdDate.split("T")[0]}</Text>
            </View>
            </View>
            <View style={tw`w-1/2 items-center`}>
              <Text style={tw`font-semibold uppercase text-13px text-center`}>Finca:{"\n"}{request.nameFarm}</Text>
              
            </View>
          </View>
          </View>}
          />
          
          
        
          
        )
      })): (<Text style={tw`text-center text-gray-500`}>No hay solicitudes enviadas</Text>)
    )
  const toggleOpen = ()=>{
    if(isOpen == false){  
        setIsOpen(true) 
        setIsOpenn(false)
    }
   
  }
  const toggleOpenn = ()=> {
    if(isOpenn == false){
        
        setIsOpenn(true)
        setIsOpen(false) 
    }
  }

 
  useEffect(() => {
      LoadOtherRequests("1", 0);
    }, []);
  return (

    <>

      <SubHeader title="Solicitudes"/>
      <SubHeader3 title="Otras Fincas" />
    
      
      <View style={styles.safeArea}>
        <View style={styles.container}>

        <View style={[tw`w-full items-center rounded-lg mt-10 pb-2`,{backgroundColor:"rgba(32, 84, 0, 0.1)"}]}>
        <View style={tw`w-full h-45px flex-row items-center mb-2 rounded-t-lg`}>
        <View style={tw`w-1/2 `}>      
        <TouchableOpacity style={!isOpen ? [tw`h-45px p-3 rounded-tl-lg w-full`, styles.colorButtonDisabled] : [tw`h-45px p-3 rounded-tl-lg w-full`, styles.colorButtonEnable]} onPress={toggleOpen}  activeOpacity={0.6}>
          <Text style={isOpen ? tw`text-center uppercase font-bold` : tw`text-center uppercase`}>salientes</Text>
        </TouchableOpacity>
        </View>
        <View style={tw`w-1/2`}> 
        <TouchableOpacity style={!isOpenn ? [tw`h-45px p-3 rounded-tr-lg w-full`, styles.colorButtonDisabled] : [tw`h-45px p-3 rounded-tr-lg w-full`, styles.colorButtonEnable]} onPress={toggleOpenn}  activeOpacity={0.6}>
        <Text style={isOpenn ? tw`text-center uppercase font-bold` : tw`text-center uppercase` }>registros</Text>
        </TouchableOpacity>
        </View>
        </View>
          <RequestTable1 children={incoming} children1={registers} isOpen={isOpen} isOpenn={isOpenn}/>
          
        </View>       
        </View>
      </View>
      
      
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
  colorButtonEnable: {
    backgroundColor: "rgba(32, 84, 0, 0.2)",
},
colorButtonDisabled:{
    backgroundColor: "rgba(32, 84, 0, 0.05)"
}

});