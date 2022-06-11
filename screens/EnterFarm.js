import global from "../global";
import React, { useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigate } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import MyFarmsContext from "../context/FarmContext";
import { Accordion } from "../components/Accordion";

export default function EnterFarm( { navigation } ) {
  const { farm } = useContext(MyFarmsContext);
  

  useBackHandler(() => {
    console.log("back");
    navigation.goBack();
    return true;
  })

  useEffect(() => {
    console.log(global.idFarm);

  }, []);

  return (
    <View style={tw`h-full w-full  px-0`}>
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
    
    </View>
  );
}
