import global from "../global";
import "react-native-gesture-handler";
import React,{useContext} from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import tw from "twrnc";
import { MenuDropDownItems } from "./MenuDropDownItems";
import MenuButton from "./MenuButton";
import { View, Image, TouchableOpacity } from "react-native";
import Agrosoft from "../assets/agrosoft.png";
import SignOff from "../assets/signOff.png"
import ContactUs from "../assets/contactUs.png"
import { SimpleLineIcons } from '@expo/vector-icons';
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-native";


export const MenuItems = ({ navigation, statusOpenAccountStack, statusOpenHomeStacks, statusOpenEmployeeStack, statusOpenRequestsMyFarmsStack, statusOpenRequestsOtherFarmsStack }) => {
    let navigate = useNavigate();
    const {LogOut} = useContext(AuthContext);
    const signOff = () =>{
        global.jwToken = "";
        navigate("/");
        console.log(global.jwToken)
    }
    return(
      <DrawerContentScrollView style={tw`pt-1 h-full `}>     
          
              <View style={tw`mb-10 h-48px px-4 items-center justify-end flex-row`}>
                  <Image source={Agrosoft} style={tw`h-53px w-205px`}/>
                  <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                      <SimpleLineIcons name="menu" size={25} color="white" />
                  </TouchableOpacity>
              </View>  
          <View style={tw`h-55%  px-5`}>    
              <MenuDropDownItems navigation={navigation} statusUser={statusOpenAccountStack} statusAdmin={statusOpenHomeStacks} statusEmployee={statusOpenEmployeeStack} statusRequestsMyFarms={statusOpenRequestsMyFarmsStack} statusRequestsOtherFarms={statusOpenRequestsOtherFarmsStack} />
          </View>
          <View style={tw`h-50% items-center  mt-20
          pt-4 pb-40`}>
              <MenuButton title={"Contáctenos"} onPress={() => navigation.navigate("Contact")} image={ContactUs} styleImage={tw`h-16px w-17px`} activeOpacity={0.6} />
              <MenuButton title={"Cerrar Sesión"} onPress={()=>{signOff(), navigation.closeDrawer()}}  image={SignOff} styleImage={tw`h-16px w-19px`} activeOpacity={0.6} /> 
          </View> 
      </DrawerContentScrollView>
    )
  }