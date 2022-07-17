import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";


export default function EnterFarm({ navigation }) {

  const [isModalOpenAddCrop, setIsModalOpenAddCrop] = useState(false);

  const [isModalOpenModifyCrop, setIsModalOpenModifyCrop] = useState(false);

  const { farm } = useContext(MyFarmsContext);
  const { crops, GetCrops, FindCrops, maxPage, sorters } = useContext(MyCropsContext);

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  })

  useEffect(() => {
    console.log(global.idFarm);
    console.log(farm)
    GetCrops(global.idFarm);

  }, []);

  return (
    <View style={tw`h-full w-full  px-0`}>
      <SubHeader title={farm.nameFarm} />

      <View style={tw`px-15px pv-5px`}>

        <View style={tw`flex-row w-full rounded-xl mt-0 `}>
          <View style={tw`p-5 pr-2 rounded-xl w-1/2`}>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`} onPress={() => navigation.navigate('Employee')}><Text style={tw`text-white text-center font-bold`}>Empleados</Text></TouchableOpacity>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`}><Text style={tw`text-white text-center font-bold`}>Actividades</Text></TouchableOpacity>

          </View>
          <View style={tw`p-5 pl-2 rounded-xl w-1/2`}>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`} onPress={() => navigation.navigate('Labor')}><Text style={tw`text-white text-center font-bold`}>Cargos</Text></TouchableOpacity>
            <TouchableOpacity style={tw`bg-green-500 w-full h-52px p-4 mt-5 rounded-xl`}><Text style={tw`text-white text-center font-bold`}>Agregar cultivo</Text></TouchableOpacity>


          </View>
        </View>
        <View style={tw`flex-row justify-between mb-3`}>
          <View style={tw``}>
            <SorterComponent sorters={sorters} sorter={"name_crop"} GetElements={GetCrops} firstParameter={farm.idFarm} />
          </View>
          <View style={tw`items-end`}>
            <SearchComponent GetElements={FindCrops} GetOriginalElements={GetCrops} secondParameter={farm.idFarm} />
            <AddButton onPress={() => setIsModalOpenAddCrop(!isModalOpenAddCrop)} />
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

        <View style={[tw`rounded-xl mx-5 border`, { backgroundColor: "rgba(32, 84, 0, 0.05)", borderColor: "rgba(32, 84, 0, 0.39)" }]}>
          <View style={[tw`h-50px items-center flex-row rounded-t-lg`, { backgroundColor: "rgba(32, 84, 0, 0.15)" }]}><Text style={tw`text-center grow text-black text-18px font-bold uppercase`}>Cultivos</Text></View>
          {crops.length > 0 ? (crops.map((crop, index) => {
            return (

              <Accordion name={crop.nameCrop} key={index} options={
                <View style={[tw`border-t`, { borderColor: "rgba(32, 84, 0, 0.39)" }]}>
                  <View style={tw`flex-row justify-between px-3 py-4`}>
                    <CartButtonCrop text={"Consultar"} /*onPress={() => {global.idFarm = farm.idFarm; setFarm(farm); navigation.navigate("EnterFarm")}}*/ color={"rgba(34, 158, 197, 1)"} />
                    <CartButtonCrop text={"Ingresar"} /*onPress={() => {global.idFarm = farm.idFarm; setFarm(farm); navigation.navigate("EnterFarm")}}*/ color={"#22C55E"} />
                    <CartButtonCrop text={"Actividades"} /*onPress={() => {global.idFarm = farm.idFarm; setFarm(farm); navigation.navigate("EnterFarm")}}*/ color={"rgba(32, 84, 0, 0.81)"} />
                  </View>
                  <View style={tw`flex-row justify-center px-3 py-4`}>
                    <View style={tw`mr-1`}>
                      <CartButtonCrop text={"Editar"} onPress={() => setIsModalOpenModifyCrop(!isModalOpenModifyCrop)} color={"rgba(234, 179, 8, 1)"} />
                    </View>
                    <View style={tw`ml-1`}>
                      <CartButtonCrop text={"Eliminar"} /*onPress={() => {global.idFarm = farm.idFarm; setFarm(farm); navigation.navigate("EnterFarm")}}*/ color={"rgba(239, 68, 68, 1)"} />
                    </View>
                  </View>
                </View>
              } />
            )
          })) : (<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}


          <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetCrops} firstParameter={farm.idFarm} />
        </View>
      </View>
    </View>
  );
}
