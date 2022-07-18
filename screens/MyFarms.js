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
import PickerSorter from "../components/PickerSorter";
import SearchByName from "../components/SearchByName";
import CleanButton from "../components/CleanButton";
import AddButton from "../components/AddButton";
import PaginationFooter from "../components/PaginationFooter";

const MyFarms = ({ navigation }) => {
  const [isModalOpenAddFarm, setIsModalOpenAddFarm] = useState(false);
  const [isModalOpenFarmDelete, setIsModalOpenFarmDelete] = useState(false);
  const [
    isModalOpenModifyFarmerInformation,
    setIsModalOpenModifyFarmerInformation,
  ] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const { farms, LoadFarms, setFarm } = useContext(MyFarmsContext);

  const [countt, setcountt] = useState(0);

  useBackHandler(() => {
    BackHandler.exitApp();
    return false;
  });

  useEffect(() => {
    setData(farms);
    setFilter(farms);
  }, [farms]);

  useEffect(() => {
    setcountt(0);
  }, [filter]);

  useEffect(async () => {
    await LoadFarms("name_farm", "asc", 0);
  }, []);

  console.log(data);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Mis fincas"} />
        <View style={styles.container}>
          <View style={tw`flex-row justify-between`}>
            <View style={tw``}>
              <PickerSorter
                list={data}
                key1="nameFarm"
                key2="createdDate"
                newList={setFilter}
              />
              <CleanButton />
            </View>
            <View style={tw`items-end`}>
              <SearchByName data={farms} key="nameFarm" setData={setFilter} />
              <AddButton
                onPress={() => setIsModalOpenAddFarm(!isModalOpenAddFarm)}
              />
            </View>
          </View>

          <ModalAddFarm
            isModalOpenAddFarm={isModalOpenAddFarm}
            setIsModalOpenAddFarm={setIsModalOpenAddFarm}
          />
          <ModalFarmDelete
            isModalOpenFarmDelete={isModalOpenFarmDelete}
            setIsModalOpenFarmDelete={setIsModalOpenFarmDelete}
          />
          <ModalModifyFarmerInformation
            isModalOpenModifyFarmerInformation={
              isModalOpenModifyFarmerInformation
            }
            setIsModalOpenModifyFarmerInformation={
              setIsModalOpenModifyFarmerInformation
            }
          />
          <ScrollView style={tw`h-65% mt-10`}>
            {filter.length > 0 ? (
              filter.map((farm, index) => {
                const indexInit = countt * 2;
                const sum = indexInit + 2;
                if (index >= indexInit && index < sum) {
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
                          global.idFarm = farm.idFarm;
                          setIsModalOpenFarmDelete(!isModalOpenFarmDelete);
                        }}
                        color={"#EF4444"}
                        image={Delete}
                      />
                    </Cart>
                  );
                }
              })
            ) : (
              <View style={styles.container}>
                <Text style={tw`text-center text-gray-500`}>
                  No se encontraron resultados
                </Text>
              </View>
            )}
          </ScrollView>

          <PaginationFooter
            list={filter}
            setcountt={setcountt}
            countt={countt}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyFarms;
