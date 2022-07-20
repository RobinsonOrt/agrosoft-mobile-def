import { REACT_APP_API_URL } from "@env";
import global from "../global";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal,
} from "react-native";
import MyCropsContext from "../context/CropContext";

import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { useForm } from "react-hook-form";

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import InputForm from "./InputForm";
import ButtonForm from "./ButtonForm";
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

const ModalInfoCrop = ({ isModalOpenInfoCrop, setIsModalOpenInfoCrop }) => {
  const { crop, coffeeBushCount, GetBarCodeCrops } = useContext(MyCropsContext);

  const downloadPdf = async () => {
    const response = await GetBarCodeCrops(crop.idCrop);
    
    if (response.data.error) {
      return;
    }

    const base64Data = response.data.dataBase64;
    const fileName = crop.nameCrop + "barcodes" + coffeeBushCount;

    const picturesUri = StorageAccessFramework.getUriForDirectoryInRoot('Documents');
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(picturesUri);
    if (permissions.granted) {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
        })
    }

  }

  return (
    <ModalModel
      isModalOpen={isModalOpenInfoCrop}
      setIsModalOpen={setIsModalOpenInfoCrop}
    >
      <View
        style={[
          tw`rounded-15px w-full mx-5 justify-center border`,
          {
            backgroundColor: "rgba(32, 84, 0, 0.1)",
            borderColor: "rgba(32, 84, 0, 0.39)",
          },
        ]}
      >
        <View
          style={[
            tw`h-50px items-center w-full flex-row rounded-t-15px`,
            { backgroundColor: "rgba(32, 84, 0, 0.1)" },
          ]}
        >
          <Text
            style={tw`text-center grow text-black text-18px font-bold uppercase`}
          >
            {crop.nameCrop}
          </Text>
        </View>

        <Text style={tw`text-15px font-bold text-center mb-3 mt-4`}>
          Descripción:{" "}
        </Text>
        <View style={tw`w-full  items-center flex-row justify-center mb-2`}>
          <Text style={tw`text-14px w-210px text-justify`}>
            {crop.descriptionCrop}
          </Text>
        </View>
        <View style={tw`w-full px-3`}>
          <View
            style={[
              tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`,
              {
                backgroundColor: "rgba(32, 84, 0, 0.15)",
                borderColor: "rgba(156, 163, 175, 1)",
              },
            ]}
          >
            <Text style={tw`text-12px font-bold text-center mr-2`}>
              Número de arbustos:
            </Text>
            <Text style={tw`text-12px text-center mr-2`}>
              {coffeeBushCount}
            </Text>
          </View>
          <View
            style={[
              tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2`,
              {
                backgroundColor: "rgba(32, 84, 0, 0.15)",
                borderColor: "rgba(156, 163, 175, 1)",
              },
            ]}
          >
            <Text style={tw`text-12px font-bold text-center mr-2`}>
              Variedad del Café:
            </Text>
            <Text style={tw`text-12px text-center mr-2`}>
              {crop.coffeeVariety}
            </Text>
          </View>
          <View
            style={[
              tw`items-center flex-row w-full h-30px border rounded-7px px-2 mt-2 mb-3`,
              {
                backgroundColor: "rgba(32, 84, 0, 0.15)",
                borderColor: "rgba(156, 163, 175, 1)",
              },
            ]}
          >
            <Text style={tw`text-12px font-bold text-center mr-2`}>
              Edad (años):
            </Text>
            <Text style={tw`text-12px text-center mr-2`}>{crop.ageCrop}</Text>
          </View>
        </View>
      </View>
      <View style={tw`mt-7 items-center mx-8`}>
        <ModalButton
          text={"Descargar codigo de barras"}
          onPress={() => {
            downloadPdf();
          }}
          color={"rgba(248, 189, 35, 0.85)"}
        />
        <ModalButton
          text={"Cerrar"}
          onPress={() => {
            setIsModalOpenInfoCrop(!isModalOpenInfoCrop);
          }}
          color={"rgba(239, 68, 68, 1)"}
        />
      </View>
    </ModalModel>
  );
};

export default ModalInfoCrop;
