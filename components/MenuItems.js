import "react-native-gesture-handler";
import global from "../global";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { CommonActions } from '@react-navigation/native';
import tw from "twrnc";
import { MenuDropDownItems } from "./MenuDropDownItems";
import MenuButton from "./MenuButton";
import { View, Image, TouchableOpacity } from "react-native";
import X from "../assets/x.png";
import Agrosoft from "../assets/agrosoft.png";
import SignOff from "../assets/signOff.png"
import ContactUs from "../assets/contactUs.png"

export const MenuItems = ({ navigation, statusOpenAccountStack, statusOpenHomeStacks, statusOpenEmployeeStack, statusOpenRequestsMyFarmsStack, statusOpenRequestsOtherFarmsStack }) => {
    
    return(
      <DrawerContentScrollView style={tw`pt-1 px-5 `}>
        
          <View style={tw`h-60%`}>
          <View style={tw`mb-10 items-center flex-row`}>
            <TouchableOpacity onPress={() => navigation.closeDrawer()}><Image source={X} style={tw`h-18px w-18px`}/></TouchableOpacity><Image source={Agrosoft} style={tw`h-50px w-200px grow`}/>
          </View>  
          <MenuDropDownItems navigation={navigation} statusUser={statusOpenAccountStack} statusAdmin={statusOpenHomeStacks} statusEmployee={statusOpenEmployeeStack} statusRequestsMyFarms={statusOpenRequestsMyFarmsStack} statusRequestsOtherFarms={statusOpenRequestsOtherFarmsStack} />
          </View>
          <View style={tw`h-218px justify-end mt-20`}>
          <MenuButton title={"Contáctenos"} onPress={() => {if(statusOpenAccountStack){navigation.reset({
            index: 0,
            routes: [
              {
                name: 'UserInformation',
     
              },
            ],
          })}}} /*isOpen={isOpenRequests}*/ image={ContactUs} styleImage={tw`h-16px w-17px`} activeOpacity={0.6} />
          <MenuButton title={"Cerrar Sesión"} /*onPress={toggleOpenRequests} isOpen={isOpenRequests}*/ image={SignOff} styleImage={tw`h-16px w-19px`} activeOpacity={0.6} /> 
          </View>
          
      </DrawerContentScrollView>
    )
  }