import global from "../global";
import React, { useContext, useState, useEffect } from "react";
import Checkbox from "expo-checkbox";

import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    Modal,
    FlatList
} from "react-native";

import tw from "twrnc";
import MyCropUserContext from "../context/CropUserContext";

import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";

const ModalAddCropUser = ({ isModalOpenAddCropUser, setIsModalOpenAddCropUser }) => {
    const { cropsToSet, setCropsToSet } = useContext(MyCropUserContext);
    const [stateA, setStateA] = useState([]);

    useEffect(() => {
        setStateA(cropsToSet);
    }, [cropsToSet])

    useEffect(() => {
        console.log("stateA");
    }, [stateA])
    

    /* const handleOnChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
        setIdCropsList([...idCropsList, value]);
    } else {
        setIdCropsList(idCropsList.filter((ev) => ev !== value));
    }
    console.log(idCropsList);
    }; */

    /* const handleChange = (id) => {
        let temp = selectedCrops.map((actualCrop) => {
          if (id === actualCrop.id) {
            return { ...actualCrop, isChecked: !actualCrop.isChecked };
          }
          return actualCrop;
        });
        setSelectedCrops(temp);
    };

    let selected = selectedCrops.filter((actualCrop) => actualCrop.isChecked);

     */

    const onChecked = async (idCrop) => {
        const data = stateA
        const index = data.findIndex(x => x.idCrop === idCrop)
        data[index].checked = !data[index].checked
        console.log(data[index])
        setStateA(data)
    }

    const check = (idCrop) => {
        const index = cropsToSet.findIndex(x => x.idCrop === idCrop)
        cropsToSet[index].checked = !cropsToSet[index].checked
    }

    const renderCrops = () => {
        return cropsToSet.map((item, key) => {
            return(
                <TouchableOpacity style={tw`flex-row m-2 items-center`} key={key} onPress={()=>check(item.idCrop)}>
                    {item.checked&& <Text>checked</Text>}
                    <Checkbox
                    value={item.checked}
                    onValueChange={() => onChecked(item.idCrop)}
                    />
                    <Text>{item.nameCrop}</Text>
                </TouchableOpacity>
            )
        })
    }

    return(
        <ModalModel isModalOpen={isModalOpenAddCropUser} setIsModalOpen={setIsModalOpenAddCropUser}>
            <Text style={tw`text-3xl font-bold text-black mt-5 mb-5`}>
                Asignar cultivos
            </Text>
            <Text style={tw`text-16px text-center pb-2 pt-1`}>Seleccione los cultivos a asignar a este usuario</Text>
            <ScrollView style={tw`mt-2 w-full mb-5 pb-3`}>
                {cropsToSet.length > 0 ? (
                    renderCrops()
                ):null}
            </ScrollView>
        </ModalModel>
    )
}

export default ModalAddCropUser;