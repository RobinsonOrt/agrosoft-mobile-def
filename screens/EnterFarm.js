import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import { useBackHandler } from "@react-native-community/hooks";
import MyFarmsContext from "../context/FarmContext";
import MyCropsContext from "../context/CropContext";
import { Accordion } from "../components/Accordion";
import SubHeader from "../components/SubHeader";
import CartButtonCrop from "../components/CartButtonCrop";
import AddButton from "../components/AddButton";
import ModalAddCrop from "../components/ModalAddCrop";
import ModalModifyCrop from "../components/ModalModifyCrop";
import ModalDelete from "../components/ModalDelete";
import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import ModalInfoCrop from "../components/ModalInfoCrop";



export default function EnterFarm({ navigation }) {

  const [isModalOpenAddCrop, setIsModalOpenAddCrop] = useState(false);
  const [isModalOpenModifyCrop, setIsModalOpenModifyCrop] = useState(false);
  const [isModalOpenInfoCrop, setIsModalOpenInfoCrop] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete ] = useState(false);

  const { farm } = useContext(MyFarmsContext);
  const { crops, GetCrops, FindCrops, maxPage, sorters, setCrop, DeleteCrop, GetCrop } = useContext(MyCropsContext);

  useBackHandler(() => {
    navigation.goBack();
    return true;
  })

  useEffect(() => {
    GetCrops(global.idFarm);
  }, []);

  return (
    <View style={tw`h-full w-full  px-0`}>
      <SubHeader title={farm.nameFarm} />
      <ScrollView style={tw`h-95%`} >
      <View style={tw`px-15px pv-5px`}>
      <View style={tw`flex-row mt-5 justify-between mb-3`}>
        <View style={tw``}>
          <SorterComponent sorters={sorters} sorter={"name_crop"} GetElements={GetCrops} firstParameter={farm.idFarm} />
        </View>
        <View style={tw`items-end`}>
          <SearchComponent GetElements={FindCrops} GetOriginalElements={GetCrops} secondParameter={farm.idFarm} />
          <AddButton onPress={() => setIsModalOpenAddCrop(!isModalOpenAddCrop)} />
        </View>
      </View>

      <View style={tw`flex-row w-full rounded-xl mt-0 `}>
          <View style={tw`p-5 pr-2 rounded-xl w-1/2`}>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`} onPress={() => navigation.navigate('Employee')}><Text style={tw`text-white text-center font-bold`}>Empleados</Text></TouchableOpacity>

            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`} onPress={() => navigation.navigate('ActivitiesMyFarms')}><Text style={tw`text-white text-center font-bold`}>Actividades</Text></TouchableOpacity>

          </View>
          <View style={tw`p-5 pl-2 rounded-xl w-1/2`}>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`} onPress={() => navigation.navigate('Labor')}><Text style={tw`text-white text-center font-bold`}>Cargos</Text></TouchableOpacity>
          </View>
         </View> 
        

        <ModalAddCrop
          isModalOpenAddCrop={isModalOpenAddCrop}
          setIsModalOpenAddCrop={setIsModalOpenAddCrop}
        />
        
        <ModalModifyCrop 
            isModalOpenModifyCrop={isModalOpenModifyCrop}
            setIsModalOpenModifyCrop={setIsModalOpenModifyCrop}
            />

        <ModalInfoCrop 
            isModalOpenInfoCrop={isModalOpenInfoCrop}
            setIsModalOpenInfoCrop={setIsModalOpenInfoCrop}
            />            

        <ModalDelete
          isModalOpenDelete={isModalOpenDelete}
          setIsModalOpenDelete={setIsModalOpenDelete}
          DeleteFunction={DeleteCrop}
          />

        <View style={[tw`rounded-xl mx-5 border`, { backgroundColor: "rgba(32, 84, 0, 0.05)", borderColor: "rgba(32, 84, 0, 0.39)" }]}>
          <View style={[tw`h-50px items-center flex-row rounded-t-lg`, { backgroundColor: "rgba(32, 84, 0, 0.15)" }]}><Text style={tw`text-center grow text-black text-18px font-bold uppercase`}>Cultivos</Text></View>
          {crops.length > 0 ? (crops.map((crop, index) => {
            return (

              <Accordion name={crop.nameCrop} key={index} options={
                <View style={[tw`border-t`, { borderColor: "rgba(32, 84, 0, 0.39)" }]}>
                  <View style={tw`flex-row justify-between px-3 py-4`}>

                    <CartButtonCrop text={"Consultar"} onPress={() => {GetCrop(crop.idCrop), setIsModalOpenInfoCrop(!isModalOpenInfoCrop)}} color={"rgba(34, 158, 197, 1)"} />
                    <CartButtonCrop text={"Ingresar"} onPress={() => {global.idCrop = crop.idCrop, setCrop(crop); navigation.navigate("CoffeeBush")}} color={"#22C55E"} />

                    <CartButtonCrop text={"Actividades"} /*onPress={() => {global.idFarm = farm.idFarm; setFarm(farm); navigation.navigate("EnterFarm")}}*/ color={"rgba(32, 84, 0, 0.81)"} />
                  </View>
                  <View style={tw`flex-row justify-center px-3 py-4`}>
                    <View style={tw`mr-1`}>
                      <CartButtonCrop text={"Editar"} onPress={() => {setIsModalOpenModifyCrop(!isModalOpenModifyCrop); setCrop(crop)}} color={"rgba(234, 179, 8, 1)"} />
                    </View>
                    <View style={tw`ml-1`}>

                      <CartButtonCrop text={"Eliminar"} onPress={() => {global.idToDelete = crop.idCrop, setIsModalOpenDelete(!isModalOpenDelete)}} color={"rgba(239, 68, 68, 1)"} />

                    </View>
                  </View>
                </View>
              } />
            )
          })) : (<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}


          <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetCrops} firstParameter={farm.idFarm} />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
