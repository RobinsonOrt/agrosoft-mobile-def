import "react-native-gesture-handler";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import tw from "twrnc";
import { MenuDropDownItems } from "./MenuDropDownItems";
import MenuButton from "./MenuButton";
import { View, Image, TouchableOpacity } from "react-native";
import Agrosoft from "../assets/agrosoft.png";
import SignOff from "../assets/signOff.png"
import ContactUs from "../assets/contactUs.png"
import { SimpleLineIcons } from '@expo/vector-icons';

export const MenuItems = ({ navigation, statusOpenAccountStack, statusOpenHomeStacks, statusOpenEmployeeStack, statusOpenRequestsMyFarmsStack, statusOpenRequestsOtherFarmsStack }) => {

    return(
      <DrawerContentScrollView style={tw`pt-1 px-5 `}>     
          <View style={tw`h-60%`}>
              <View style={tw`mb-10 h-48px items-center flex-row`}>
                  <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                      <SimpleLineIcons name="menu" size={22} color="white" />
                  </TouchableOpacity>
                  <Image source={Agrosoft} style={tw`h-50px w-200px`}/>
              </View>  
              <MenuDropDownItems navigation={navigation} statusUser={statusOpenAccountStack} statusAdmin={statusOpenHomeStacks} statusEmployee={statusOpenEmployeeStack} statusRequestsMyFarms={statusOpenRequestsMyFarmsStack} statusRequestsOtherFarms={statusOpenRequestsOtherFarmsStack} />
          </View>
          <View style={tw`h-218px justify-end mt-20`}>
              <MenuButton title={"Contáctenos"} /*onPress={() => logOut()} isOpen={isOpenRequests}*/ image={ContactUs} styleImage={tw`h-16px w-17px`} activeOpacity={0.6} />
              <MenuButton title={"Cerrar Sesión"} /* onPress={logOut()} isOpen={isOpenRequests}*/ image={SignOff} styleImage={tw`h-16px w-19px`} activeOpacity={0.6} /> 
          </View> 
      </DrawerContentScrollView>
    )
  }