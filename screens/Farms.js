import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import MyFarmsContext from "../context/FarmContext";
import MyEmployeesContext from "../context/EmployeeContext";
import { useBackHandler } from "@react-native-community/hooks";
import { Cart } from "../components/Cart";
import CartButton from "../components/CartButton";
import SubHeader from "../components/SubHeader";
import ModalDelete from "../components/ModalDelete";
import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";

export default function Farms({ navigation }) {
  const { LoadEmployeedFarms, employeedFarms, setIdFarm, FindFarmsEmployeed, sorters, maxPage } = useContext(MyFarmsContext);
  const { LeaveFarm, error, message } = useContext(MyEmployeesContext);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas");
    return true;
  });

  useEffect(async () => {
    await LoadEmployeedFarms();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Fincas"} />
        {error ? <Text>{message}</Text> : null}
        <ScrollView style={styles.container}>
          <View style={tw`flex-row justify-between`}>
            <View style={tw``}>
              <SorterComponent sorters={sorters} sorter={"name_farm"} GetElements={LoadEmployeedFarms} />
            </View>
            <View style={tw`items-end`}>
              <SearchComponent GetElements={FindFarmsEmployeed} GetOriginalElements={LoadEmployeedFarms} />
            </View>
          </View>
          <ModalDelete
            isModalOpenDelete={isModalOpenDelete}
            setIsModalOpenDelete={setIsModalOpenDelete}
            DeleteFunction={LeaveFarm}
            text={"¿Estás seguro que deseas abandonar la finca?"}
          />
          {employeedFarms.length > 0 ? (
            employeedFarms.map((farm, index) => {
              return (
                <Cart
                  name={farm.nameFarm}
                  description={farm.nameAdmin}
                  id={farm.idFarm}
                  color={farm.colorFarm}
                  key={index}
                >

                  <CartButton
                    text={"Ingresar"}
                    onPress={() => {
                      setIdFarm(farm.idFarm);
                      navigation.navigate("EmployeeCrops");
                    }}
                    color={"#22C55E"}
                    image={Enter}
                  />

                  <CartButton
                    text={"Abandonar"}
                    onPress={() => {
                      global.idToDelete = farm.idFarm;
                      setIsModalOpenDelete(!isModalOpenDelete)
                    }}
                    color={"#EF4444"}
                    image={Leave}
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
          <Pagination maxPage={maxPage} sorters={sorters} GetElements={LoadEmployeedFarms} />
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  colorButton: {
    backgroundColor: "rgba(234, 179, 8, 1)",
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  cardBush: {
    backgroundColor: "red",
  },
  safeArea: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: "5%",
    marginTop: "5px",
  },
  sectionDescription: {
    fontSize: 20,
    fontFamily: "Roboto",
    height: 30,
    marginLeft: "5%",
  },
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
