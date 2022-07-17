import global from "../global";
import React, { useState,useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import MyFarmsContext from "../context/FarmContext";
import MyCropsContext from "../context/CropContext";
import { Accordion } from "../components/Accordion";
import SubHeader from "../components/SubHeader";
import CartButton from "../components/CartButton";
import CartButtonCrop from "../components/CartButtonCrop";
import PickerSorter from "../components/PickerSorter";
import SearchByName from "../components/SearchByName";
import CleanButton from "../components/CleanButton";
import AddButton from "../components/AddButton";
import { MaterialIcons } from '@expo/vector-icons';
import ModalAddCrop from "../components/ModalAddCrop";
import PaginationDot from 'react-native-animated-pagination-dot';
import { Ionicons } from '@expo/vector-icons';
import ModalModifyCrop from "../components/ModalModifyCrop";

export default function EnterFarm( { navigation } ) {

  const [isModalOpenAddCrop, setIsModalOpenAddCrop] = useState(false);
  const [isModalOpenModifyCrop, setIsModalOpenModifyCrop] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [statusButtonn, setStatusButtonn] = useState(false);
  
  const { farm } = useContext(MyFarmsContext);
  const { crops, GetCrops, maxPage, sorters } = useContext(MyCropsContext);

  const nextPage = ()=>{
    sorters.page++
    console.log(sorters.page)
    GetCrops(farm.idFarm)
  }

  const prevPage = ()=>{
    sorters.page--
    GetCrops(farm.idFarm)
  }
  

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
      <SubHeader title={farm.nameFarm}/>

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
              <PickerSorter /*list={data} key1="nameFarm" key2="createdDate" newList={setFilter}*/ />
              <CleanButton/>
            </View>
            <View style={tw`items-end`}>
              <SearchByName />
              <AddButton onPress={() => setIsModalOpenAddCrop(!isModalOpenAddCrop)}/>
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

      <View style={[tw`rounded-xl mx-5 border`,{backgroundColor:"rgba(32, 84, 0, 0.05)",borderColor:"rgba(32, 84, 0, 0.39)"}]}>
        <View style={[tw`h-50px items-center flex-row rounded-t-lg`,{backgroundColor:"rgba(32, 84, 0, 0.15)"}]}><Text style={tw`text-center grow text-black text-18px font-bold uppercase`}>Cultivos</Text></View>
        {crops.length > 0 ? (crops.map((crop, index) => {
        return (

        <Accordion name={crop.nameCrop} key={index} options={
          <View style={[tw`border-t`,{borderColor:"rgba(32, 84, 0, 0.39)"}]}>
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
        }/>
        )
      })):(<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}
        
        <View style={tw`flex-row items-center justify-center`}>
    <TouchableOpacity
      onPress={() => {prevPage()}}
    ><Ionicons name="md-arrow-back-circle-sharp" size={50} color="rgba(81, 212, 0, 0.38)" />
      
    </TouchableOpacity>
      <PaginationDot activeDotColor={'black'}
        curPage={sorters.page + 1}
        maxPage={maxPage + 1}
        />
      <TouchableOpacity
      onPress={() => {nextPage()}}
      disabled={statusButton}
    >
     
     <Ionicons name="md-arrow-forward-circle-sharp" size={50} color="rgba(81, 212, 0, 0.38)" />
    </TouchableOpacity>  
  </View>

      </View>
      
      
        {/*<Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
        </Accordion>
        <Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
        </Accordion>
        <Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
        </Accordion>
        <Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
        </Accordion>
        <Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
        </Accordion>
        <Accordion title={"Nombre del Cultivo"}>
          <View style={tw`bg-gray-300 w-full p-4 pt-1 mt-1 rounded-xl`}>
                  
            <Text style={tw`text-white text-center grow font-bold`}>
                Descripcion cultivo
            </Text>

          </View>
    </Accordion>*/}
        </View>
    </View>
  );
}
