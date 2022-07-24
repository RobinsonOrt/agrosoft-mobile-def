import { REACT_APP_API_URL } from "@env";
import global from "../global";
import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal,
} from "react-native";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import MyFarmsContext from "../context/FarmContext";

export default function ModalFarmDelete({
  isModalOpenFarmDelete,
  setIsModalOpenFarmDelete,
}) {

  const { DeleteFarm } = useContext(MyFarmsContext);

  return (
    
    <ModalModel isModalOpen={isModalOpenFarmDelete} setIsModalOpen={setIsModalOpenFarmDelete}>
                <Text style={tw` text-black mb-10 w-283px  text-center`}>
                  ¿Está seguro que quiere eliminar su finca?
                </Text>
                <View style={tw`w-full px-6`}>
                <ModalButton text={"Confirmar"} onPress={()=> {DeleteFarm(), setIsModalOpenFarmDelete(false)}} color={"#22C55E"}/>
                <ModalButton text={"Cancelar"} onPress={() => {setIsModalOpenFarmDelete(!setIsModalOpenFarmDelete)}} color={"rgba(220, 38, 38, 0.86)"}/>
                </View>
         </ModalModel>
  );
}
