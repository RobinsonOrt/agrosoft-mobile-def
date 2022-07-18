import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import tw from "twrnc";
import { useBackHandler } from "@react-native-community/hooks";
import MyFarmsContext from "../context/FarmContext";
import MyActivitiesContext from "../context/ActivityContext";
import { Accordion } from "../components/Accordion";
import SubHeader from "../components/SubHeader";
import CartButtonCrop from "../components/CartButtonCrop";
import AddButton from "../components/AddButton";
import ModalAddActivityMyFarms from "../components/ModalAddActivityMyFarms";
import ModalModifyActivityMyFarms from "../components/ModalModifyActivityMyFarms";
import ModalDelete from "../components/ModalDelete";

import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import ModalInfoCrop from "../components/ModalInfoCrop";
import { RequestTable1 } from "../components/RequestTable1";
import { TableActivitiesMyFarms } from "../components/TableActivitiesMyFarms";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";


const ActivitiesMyFarms = ({ navigation }) => {


    const [isModalOpenAddActivityMyFarms, setIsModalOpenAddActivityMyFarms] = useState(false);
    const [isModalOpenModifyActivityMyFarms, setIsModalOpenModifyActivityMyFarms] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete ] = useState(false);

    const [activityType, setActivityType] = useState("1")    
    
    const { farm } = useContext(MyFarmsContext);
    const { activities, GetActivities, FindActivities, maxPage, sorters, setActivity, DeleteActivity, GetActivity } = useContext(MyActivitiesContext);
    
    useEffect(() => {
      GetActivities(activityType,global.idFarm,);
    }, [activityType]);

    console.log("estas son las actividades"+activities)
    console.log("Tipo de actividad"+activityType)
    const subHeaderTable = (
        <View style={[tw`w-full  items-center flex-row h-8`, {backgroundColor:"rgba(32, 84, 0, 0.2)"}]} >
        <View style={tw`w-35% items-center`}>
          <Text style={tw`text-center`}>Titulo</Text>
        </View>
        <View style={tw`w-42% items-center`}>
          <Text>Descripción</Text>
          
        </View>
        <View style={tw`w-23% items-center`}>
          <Text>Opciones</Text>
          
        </View>
      </View>
    )

    const incoming = (
      <ScrollView style={tw`max-h-93.7%`}>
      {activities.length > 0 ? (activities.map((activity, index) => {
        return(
        <View style={[tw`w-full items-center flex-row  pt-2 border-t`, {borderColor:"rgba(81, 212, 0, 0.2)"}]} key={index}>
          <View style={tw`w-35% px-2`}>
            <Text style={tw`text-justify w-full`}>{activity.nameActivity}</Text>
          </View>
          <View style={tw`w-42% px-2`}>
            <Text style={tw`text-justify w-full`}>{activity.descriptionActivity}</Text>
          </View>
          <View style={tw`w-23% items-center`}>
          <View style={tw`my-1`}>  
          <CartButtonCrop text={"Campos  "} onPress={() => {global.idActivity = activity.idActivity, navigation.navigate("Fields")}} color={"rgba(34, 158, 197, 1)"} icon={<AntDesign name="search1" size={12} color="white" />} />
          </View>
          <View style={tw`my-1`}>
          <CartButtonCrop text={"Editar  "} onPress={() => {setIsModalOpenModifyActivityMyFarms(!isModalOpenModifyActivityMyFarms); setActivity(activity)}} color={"rgba(234, 179, 8, 1)"} icon={<AntDesign name="edit" size={15} color="white" />}/>
          </View>
          <View style={tw`my-1`}>
          <CartButtonCrop text={"Eliminar"} onPress={() => {global.idToDelete = activity.idActivity, global.idActivityType = activityType, setIsModalOpenDelete(!isModalOpenDelete)}} color={"rgba(239, 68, 68, 1)"} icon={<AntDesign name="delete" size={12} color="white" />}/>
          </View>
            
          </View>
        </View>)})):(<Text style={tw`text-center text-gray-500 mt-3`}>No cuenta con actividades</Text>)}
        </ScrollView>)

    return(
        
            <>
      <View style={tw`h-full w-full px-0`}>
            <SubHeader title="Actividades"/>
            
            <ModalAddActivityMyFarms isModalOpenAddActivityMyFarms={isModalOpenAddActivityMyFarms} setIsModalOpenAddActivityMyFarms={setIsModalOpenAddActivityMyFarms}/>
            <ModalModifyActivityMyFarms isModalOpenModifyActivityMyFarms={isModalOpenModifyActivityMyFarms} setIsModalOpenModifyActivityMyFarms={setIsModalOpenModifyActivityMyFarms}/>
            <ModalDelete
              isModalOpenDelete={isModalOpenDelete}
              setIsModalOpenDelete={setIsModalOpenDelete}
              DeleteFunction={DeleteActivity}
              />
      <View style={styles.safeArea}>
            
        <View style={styles.container}>
        <View style={tw`flex-row justify-between mb-5`}>
                <View style={tw``}>
                <SorterComponent sorters={sorters} sorter={"name_activity"} GetElements={GetActivities} firstParameter={activityType} secondParameter={farm.idFarm}/>
                </View>
                <View style={tw`items-end`}>
                <SearchComponent GetElements={FindActivities} GetOriginalElements={GetActivities} secondParameter={activityType} thirdParameter={farm.idFarm}/>
                <AddButton onPress={() => {global.idActivityType = activityType, setIsModalOpenAddActivityMyFarms(!isModalOpenAddActivityMyFarms)}} />
                </View>
            </View> 

          <TableActivitiesMyFarms setActivityType={setActivityType} title1="Arbustos" title2="Cultivos" children={incoming} subHeaderTable={subHeaderTable}/>
          <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetActivities} firstParameter={activityType} secondParameter={farm.idFarm} />
        </View>
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 14,
  },
});
export default ActivitiesMyFarms