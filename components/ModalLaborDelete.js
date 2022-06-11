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
import MyLaborsContext from "../context/LaborsContext";



import NetInfo from '@react-native-community/netinfo';


export default function ModalLaborDelete({isModalOpenLaborDelete, setIsModalOpenLaborDelete}){    
    const unsubscribe = NetInfo.addEventListener(state => {
        if(!state.isConnected){
          redirectConnection();
        }
      });    
      
      const { DeleteLabor } = useContext(MyLaborsContext);
    
      const onSubmit = async () => {
        DeleteLabor(global.idLabor);
        setIsModalOpenLaborDelete(false);
      }
    
      const modalContainerStyle= {
          flex:1,
          justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.6)',
        
      }
  
      const modalStyle= {
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

    return(
        <>
            <Modal visible={isModalOpenLaborDelete} transparent={true} animationType={'fade'}>
                <View style={modalContainerStyle}>
                    <View style={modalStyle}> 
                    <View style={tw`h-full flex items-center mt-5 justify-center`}>
      
      <View style={tw`px-7 mb-10 flex items-center justify-center`}>
      <Text style={tw` text-black mb-10 w-283px  text-center`}>
            ¿Está seguro que quiere eliminar el cargo?
      </Text>

      
        
        <TouchableOpacity
            style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
            onPress={onSubmit}
          >
            <Text style={tw`text-lg text-white text-center`}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
            onPress={() => setIsModalOpenLaborDelete(!setIsModalOpenLaborDelete)}
          >
            <Text style={tw`text-lg text-white text-center`}>Cancelar </Text>
            
          </TouchableOpacity>
      </View>
    </View>          
                

                    </View>
                </View>  
            </Modal>
        </>
    )
}