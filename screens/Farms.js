import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import Info from "../assets/info.png";
import Leave from "../assets/leave.png";
import Enter from "../assets/Enter.png";
import MyFarmsContext from "../context/FarmContext";
import MyEmployeesContext from "../context/EmployeeContext";
import { useBackHandler } from "@react-native-community/hooks";
import { Accordion } from "../components/Accordion";
import { Cart } from "../components/Cart";
import CartButton from "../components/CartButton";
import PickerSorter from "../components/PickerSorter";
import CleanButton from "../components/CleanButton";
import SearchByName from "../components/SearchByName";
import SubHeader from "../components/SubHeader";

export default function Farms({ navigation }) {
  const { LoadEmployeedFarms, employeedFarms, setIdFarm } =
    useContext(MyFarmsContext);
  const { LeaveFarm, error, message } = useContext(MyEmployeesContext);

  useBackHandler(() => {
    console.log("back");
    navigation.navigate("Mis fincas");
    return true;
  });

  useEffect(async () => {
    await LoadEmployeedFarms("name_farm", "asc", 0);
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <SubHeader title={"Fincas"} />
        {error ? <Text>{message}</Text> : null}
        <ScrollView style={styles.container}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View>
              <SearchByName
              //data={farms} key="nameFarm" setData={setFilter}
              />
              <CleanButton />
            </View>
            <PickerSorter
            //list={data}
            //key1="nameFarm"
            //key2="createdDate"
            //newList={setFilter}
            />
          </View>
          {employeedFarms.length > 0 ? (
            employeedFarms.map((farm, index) => {
              return (
                <Cart
                  name={farm.nameFarm}
                  description={farm.nameAdmin}
                  id={farm.idFarm}
                  key={index}
                >
                  <Link
                    style={tw`flex-1`}
                    to="/employeecrops"
                    onPress={() => {
                      setIdFarm(farm.idFarm);
                    }}
                  >
                    <CartButton
                      text={"Ingresar"}
                      onPress={() => {
                        setIdFarm(farm.idFarm);
                      }}
                      color={"#22C55E"}
                      image={Enter}
                    />
                  </Link>
                  <CartButton
                    text={"Abandonar"}
                    // onPress={() => {
                    //   global.idFarm = farm.idFarm;
                    //   setIsModalOpenFarmDelete(!isModalOpenFarmDelete);
                    // }}
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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
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
});
