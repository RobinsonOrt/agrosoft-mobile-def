import global from "../global";
import React from "react";
import tw from "twrnc";
import { View, Text, Image, ImageBackground} from "react-native";
import Logo from "../assets/logo.png";
import Background from "../assets/background.jpg";
import { BlurView } from "expo-blur";
import { Link } from "react-router-native";
import NetInfo from '@react-native-community/netinfo';
import { useNavigate } from "react-router-native";

export default function Home() {

  
  
  const navigate = useNavigate();
  
  const unsubscribe = NetInfo.addEventListener(state => {
    
    if(!state.isConnected){
      redirectConnection();
    }
  });
  const redirectConnection = () => {
    global.urlConnected = "/";
    navigate("/notConected");
  }

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={tw`flex justify-center`}
    >
      <View style={tw`h-full flex items-center justify-center`}>
        <Text style={tw`text-4xl font-bold text-white`}>AgroSoft</Text>
        <Image source={Logo} style={tw`h-48 w-48 my-26`} />
        <BlurView
          tint="dark"
          intensity={100}
          style={tw`bg-gray-500 p-7 rounded-2xl w-80`}
        >
          <Link to={'/login'}  underlayColor="#ddddd" >
            <Text
              style={tw`bg-yellow-600 text-lg text-white px-5 py-3 rounded-lg mb-7 text-center `}
            >
              Ingresar
            </Text>
          </Link>
          <Link to={'/register'}  underlayColor="#ddddd">
            <Text
              style={tw`bg-yellow-900 text-lg text-white px-5 py-2 rounded-lg text-center`}
            >
              Registrarse
            </Text>
          </Link>
        </BlurView>
      </View>
    </ImageBackground>
  );
}
