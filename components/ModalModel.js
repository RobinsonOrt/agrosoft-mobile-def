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

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import MyFarmsContext from "../context/FarmContext";

export default function ModalModel({isModalOpen, setIsModalOpen, children}) {

  const modalContainerStyle = {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
  };

  const modalStyle = {
    backgroundColor: "white",
    alignItems: "center",
    margin: 20,
    borderRadius: 16,
    borderColor: "#205400",
    borderWidth: 0.5,
    shadowColor: "#205400",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };

  const modalContent = {
    backgroundColor: "rgba(32, 84, 0, 0.12)",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "#205400",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  };

  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={"fade"} onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={[modalContainerStyle, tw`h-full`]}>
          <View style={[modalStyle, tw`` ]}>
            <View style={[modalContent, tw`w-full h-full`]}>
              <View style={tw`w-full h-full items-center mt-5 mb-5 justify-center`}>
                  {children}             
              </View>
            </View>  
          </View>
        </View>
      </Modal>
    </>
  );
}


