import global from "../global";
import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  TextInput,
} from "react-native";

import tw from "twrnc";
import ModalAddFarm from "../components/ModalAddFarm";
import ModalFarmDelete from "../components/ModalFarmDelete";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Enter from "../assets/Enter.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { styles } from "./Farms";
import ModalModifyFarmerInformation from "../components/ModalModifyFarmerInformation";
import MyFarmsContext from "../context/FarmContext";
import { useBackHandler } from "@react-native-community/hooks";
import { Cart } from "../components/Cart";
import CartButton from "../components/CartButton";
import SubHeader from "../components/SubHeader";
import AddButton from "../components/AddButton";

import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import ModalDelete from "../components/ModalDelete";

const MyFarms = ({ navigation }) => {
  const [isModalOpenAddFarm, setIsModalOpenAddFarm] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [
    isModalOpenModifyFarmerInformation,
    setIsModalOpenModifyFarmerInformation,
  ] = useState(false);

  const { farms, LoadFarms, setFarm, sorters, maxPage, FindFarms, DeleteFarm } =
    useContext(MyFarmsContext);

  useBackHandler(() => {
    BackHandler.exitApp();
    return false;
  });

  useEffect(async () => {
    await LoadFarms();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Mis fincas"} />

        <ScrollView style={tw`h-95%`}>
          <View style={styles.container}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw``}>
                <SorterComponent
                  sorters={sorters}
                  sorter={"name_farm"}
                  GetElements={LoadFarms}
                />
              </View>
              <View style={tw`items-end`}>
                <SearchComponent
                  GetElements={FindFarms}
                  GetOriginalElements={LoadFarms}
                />
                <AddButton
                  onPress={() => setIsModalOpenAddFarm(!isModalOpenAddFarm)}
                />
              </View>
            </View>

            <ModalAddFarm
              isModalOpenAddFarm={isModalOpenAddFarm}
              setIsModalOpenAddFarm={setIsModalOpenAddFarm}
            />
            <ModalDelete
              isModalOpenDelete={isModalOpenDelete}
              setIsModalOpenDelete={setIsModalOpenDelete}
              DeleteFunction={DeleteFarm}
            />
            <ModalModifyFarmerInformation
              isModalOpenModifyFarmerInformation={
                isModalOpenModifyFarmerInformation
              }
              setIsModalOpenModifyFarmerInformation={
                setIsModalOpenModifyFarmerInformation
              }
            />
            {farms.length > 0 ? (
              farms.map((farm, index) => {
                return (
                  <Cart
                    name={farm.nameFarm}
                    description={farm.descriptionFarm}
                    id={farm.idFarm}
                    key={index}
                  >
                    <CartButton
                      text={"Ingresar"}
                      onPress={() => {
                        global.idFarm = farm.idFarm;
                        setFarm(farm);
                        navigation.navigate("EnterFarm");
                      }}
                      color={"#22C55E"}
                      image={Enter}
                    />
                    <CartButton
                      text={"Editar"}
                      onPress={() => {
                        setFarm(farm);
                        setIsModalOpenModifyFarmerInformation(
                          !isModalOpenModifyFarmerInformation
                        );
                      }}
                      color={"#F8BD23"}
                      image={Edit}
                    />
                    <CartButton
                      text={"Eliminar"}
                      onPress={() => {
                        (global.idToDelete = farm.idFarm),
                          setIsModalOpenDelete(!isModalOpenDelete);
                      }}
                      color={"#EF4444"}
                      image={Delete}
                    />
                  </Cart>
                );
              })
            ) : (
              <View style={styles.container}>
                <Text style={tw`text-center text-gray-500`}>
                  No se encontraron resultados
                </Text>
              </View>
            )}
            <Pagination
              maxPage={maxPage}
              sorters={sorters}
              GetElements={LoadFarms}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyFarms;
